Agendas = new Mongo.Collection('agendas');

if (Meteor.isClient) {

  Template.body.helpers ({
    agendas: function() {
      if (Session.get('hideCompleted')) {
        return Agendas.find({checked: {$ne:true}});
      }
      else {
      return Agendas.find();
      }
    },

    hideCompleted: function() {
      return Session.get('hideCompleted');
    }
  });

  Template.body.events ({
    'submit .new-form-agenda': function(event) {
    var title = event.target.title.value;
      if (title) {
          Meteor.call('addAgenda', title)

          event.target.title.value = "";
          return false;
      }
    },

    'change .hide-completed input': function(event) {
      Session.set('hideCompleted', event.target.checked);
    }

  });

  Template.agenda.events ({
    'click .toggle-check': function() {
      Agendas.update(this._id, {$set: {
          checked: !this.checked
        }});
    },

    'click .delete': function() {
      Agendas.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}


Meteor.methods({
  addAgenda: function(title) {
    Agendas.insert({
      title: title,
      createdAt: new Date()
    });
  }

});

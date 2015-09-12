Agendas = new Mongo.Collection('agendas');

if (Meteor.isClient) {

  Template.body.helpers ({
    agendas: function() {
      return Agendas.find();
    }
  });

  Template.body.events ({
    'submit .new-form-agenda': function(event) {
    var title = event.target.title.value;
      if (title) {
          Agendas.insert({
            title: title,
            createdAt: new Date()
          });

          event.target.title.value = "";
          return false;
      }
    }
  });


  Template.agenda.events ({
    'click .delete': function() {
      Agendas.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

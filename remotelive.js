Projects = new Meteor.Collection("projects");

if (Meteor.isClient) {

  $(".create-overlay").on('click', function() {
    this.css('visibility', 'hidden');
    console.log('clicked')
  })

  $("#submit-question").on('click', function() {
    console.log('what?');
  })

  Template.header.user = function() {
    return false;
  };

  Template.projects.projects = function() {
    return Projects.find({}, {sort: {date_created: -1}});
  }

  Template.projects.events({

    "click #add-question" : function (e) {
      if (!Meteor.user()) {
        alert('not logged in!')
      }

      else {
        
      }
    }
  })

  Meteor.startup(function () {

  });


  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    clear: function () {
      Projects.remove({})
    }
  })

}

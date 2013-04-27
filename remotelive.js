Projects = new Meteor.Collection("projects");

if (Meteor.isClient) {

  Template.header.user = function() {
    return false;
  };

  Template.projects.projects = function() {
    return Projects.find({}, {sort: {date_created: -1}});
  }

  Template.projects.events({

    "click #add-question" : function (e) {
      
      $(".create-overlay").css("visibility", "display");
      console.log('yeah');

    }
  })

  Meteor.startup(function () {
    $(".create-overlay").hide();

    $("#question").on('click', function() {
      $(".create-overlay").fadeIn();
    })

    $(".create-overlay").on('click', function() {
      $(this).hide();
    })
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

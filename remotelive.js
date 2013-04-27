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

    $("#question").on('click', function() {
      if (!Meteor.user()) {
        $(".signin-overlay").fadeIn(100);
      }
      else {
        $(".create-overlay").fadeIn(100);
      }
    })

    $(".overlay").on('click', function(e) {
      e.stopPropagation();
    })

    $(".create-overlay").on('click', function(e) {
      $(this).hide()
    })

    $(".signin-overlay").on('click', function(e) {
      $(this).hide()
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

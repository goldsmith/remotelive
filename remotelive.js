Projects = new Meteor.Collection("projects");

if (Meteor.isClient) {

  Template.header.user = function() {
    return false;
  };

  Template.projects.projects = function() {
    return Projects.find({}, {sort: {created_at: -1}});
  }

  Meteor.setInterval(function() {
    Projects.find({}, {sort: {created_at: -1}}).forEach(function (project) {
      Projects.update(project._id, {$set: {'relative_date': moment(project.created_at).fromNow()}})
    })
  }, 1000)

  Template.createQuestion.events({

    "click #submit-question" : function (e) {
      Projects.insert({
        title: $("textarea").val(),
        language: $("#programming-language").val(),
        creator: "imkevinxu",
        created_at: Date.parse(new Date()),
        relative_date: "a few seconds ago",
        room: Math.floor(1000000*Math.random())
      })
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

  });

  Meteor.methods({
    clear: function () {
      Projects.remove({});
    }
  })

}

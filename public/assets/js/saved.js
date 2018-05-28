$(document).ready(function() {
  $(".unsave-btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));

    $.post("/unsave_article/" + $(this).attr("data-id"), function(data) {
      if (data) {
        window.location = "/saved";
      }
    });
  });

  $(".notes-btn").on("click", function(event) {
    event.preventDefault();
    var modalTitle = $(this).attr("data-title");
    var modalArticleId = $(this).attr("data-id");
    console.log(modalTitle, modalArticleId);

    //Empty modal contents

    $(".modal-title").empty();
    $("#note-title").val("");
    $("#note-body").val("");

    $(".modal-title").text(modalTitle);
    $(".add-note-btn").attr("data-id", modalArticleId);

    //GET Associated notes and Handlebrs.

    $("#note-modal").modal("show");
  });
});

$(".add-note-btn").on("click", function(event) {
  var articleId = $(this).attr("data-id");
  var noteObj = {};
  var noteTitle = $("#note-title")
    .val()
    .trim();
  var noteBody = $("#note-body")
    .val()
    .trim();

  if (noteBody && noteTitle) {
    noteObj.title = noteTitle;
    noteObj.body = noteBody;
    console.log(noteObj);
    console.log("articleID: " + articleId);
    $.post("/create_associate_note/" + articleId, noteObj, function(data) {
      if (data) {
        console.log(data);
        $("#note-modal").modal("hide");
      }
    });
  } else {
    $("#note-title").val("");
    $("#note-body").val("");
    console.log("missing form fields");
  }
});

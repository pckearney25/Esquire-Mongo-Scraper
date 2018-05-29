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

  //$(".notes-btn").on("click", function(event) {
  //event.preventDefault();
  //var modalTitle = $(this).attr("data-title");
  //var modalArticleId = $(this).attr("data-id");
  //console.log(modalTitle, modalArticleId);

  //Empty modal contents

  //$(".modal-title").empty();
  //$("#modal-notes-container").empty();
  //$("#note-title").val("");
  //$("#note-body").val("");

  //$(".modal-title").text(modalTitle);

  //We carry the article_id numbers forward to the notes buttons.
  //$(".add-note-btn").attr("data-id", modalArticleId);

  //GET Associated notes and Handlebrs.

  //$.get("/populate_notes/" + modalArticleId, function(data) {
  //if (data) {
  //$("#note-modal").modal("show");
  //}

  //$("#note-modal").modal("show");
  //});
  //});

  $(".add-note-btn").on("click", function(event) {
    var articleId = $(this).attr("data-id");
    var noteObj = {};
    var noteTitle = $("#note-title" + articleId)
      .val()
      .trim();
    var noteBody = $("#note-body" + articleId)
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
          window.location = "/saved";
        }
      });
    } else {
      console.log("missing form fields");
    }
    $("#note-title" + articleId).val("");
    $("#note-body" + articleId).val("");
  });
});

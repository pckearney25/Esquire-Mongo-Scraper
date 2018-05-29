$(document).ready(function() {
  $(".unsave-btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));

    $.post("/unsave_article/" + $(this).attr("data-id"), function(data) {
      if (data) {
        location.reload();
      }
    });
  });

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
      noteObj.article = articleId;
      console.log(noteObj);

      $.post("/create_associate_note/" + articleId, noteObj, function(data) {
        if (data) {
          console.log(data);
          location.reload();
        }
      });
    } else {
      console.log("missing form fields");
    }
    $("#note-title" + articleId).val("");
    $("#note-body" + articleId).val("");
  });

  $(".delete-note-btn").on("click", function(event) {
    console.log("Note ID: " + $(this).attr("data-note-id"));
    console.log("Article ID: " + $(this).attr("data-article-id"));

    var articleId = $(this).attr("data-article-id");
    var noteId = $(this).attr("data-note-id");
    var articleObj = {};
    articleObj._id = articleId;
    console.log(articleObj);

    $.post("/delete_disassociate_note/" + noteId, articleObj, function(data) {
      if (data) {
        console.log(data);
        location.reload();
      }
    });
  });
});

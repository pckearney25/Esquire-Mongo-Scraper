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
});

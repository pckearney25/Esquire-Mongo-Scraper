$(document).ready(function() {
  $(".btn-scrape").on("click", function(event) {
    event.preventDefault();
    $.get("/scrapes", function(data) {
      if (data) {
        console.log(data);
        location.reload();
      }
    });
  });

  $(".save-btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));

    $.post("/update_as_saved/" + $(this).attr("data-id"), function(data) {
      if (data) {
        location.reload();
      }
    });
  });

  $(".have-read-btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));
    $.post("/update_as_read/" + $(this).attr("data-id"), function(data) {
      if (data) {
        location.reload();
      }
    });
  });
});

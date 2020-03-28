var userID = 2;

$(function () {
  const RESTURL = "http://bexleycodingcamp.com/?rest_route=/"


  $.get(RESTURL+"wp/v2/users/" + userID)
    .done( function(response) {
      console.log(response);
    })
});

// wraps the whole document that starts off the javascript once it's loaded
$(document).ready(function(){

// create an array to hold the initial topics to choose from for the gif search
var topics = ["cat", "dog", "bird", "fish", "elephant", "cow", "goat", "tiger", "lizard", "sheep"]
// defines the max number of images on the screen for the given topic
var limit = 12;
// an array to hold the movies inputted by the user
var movies = ["The Matrix", "John Wick", "Star Wars", "The Departed"];

// function to run an ajax query to the giphy database and append the appropriate data to the div for images
function displayTopic(){

limit = $("#limit").val();  

var topic = $(this).attr("data-name")
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=GCc727r4Dk1UdzGryw1p7vGyOtx65UXG&limit=" + limit + "";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
      
var data = response.data

console.log(data)
// loop the ajax data to pull out the specific gif urls that we want and add tags to hold data to animate/stop them     
for(i=0; i<limit; i++){
   $("#image-view").prepend("<div class='card' style='max-width:200px;'>" 
   + '<img class="gif" data-state="still" height="150" width="150" data-still=' + data[i].images.original_still.url + ' src=' + data[i].images.original_still.url 
   + ' data-animate=' + data[i].images.original.url + ' />' + "<figcaption><b>Rating: </b>" + data[i].rating + "</figcaption>")
}   
// the on-click gif function that will trigger the animate or stop
$(".gif").on("click", function(){

  var state = $(this).attr('data-state')

  if(state === 'still'){
    $(this).attr('src', $(this).attr('data-animate'))
    $(this).attr('data-state', 'animate')
  } else {
    $(this).attr('src', $(this).attr('data-still'))
    $(this).attr('data-state', 'still')
  }
})  
});
}


// function to display the buttons compiled from our array of topics
function renderButtons(){
// prevents repeat buttons from being created by just deleting before adding
  $("#image-buttons").empty();
  $("#movie-buttons").empty();
// loop through the array of topics
  for(var i = 0; i < topics.length; i++){
// create a button for each topic in the array  
      var a = $("<button>");
// bootstrap style class
      a.addClass("btn btn-secondary");
// add the class of topic
      a.addClass("topic");
// add the data attribute 
      a.attr("data-name", topics[i]);
// give each button text specific to the topic
      a.text(topics[i]);
// append the button to the buttons div
      $("#image-buttons").append(a);
  }
// do the same but for the movies side, make button add classes append to div
  for(var i = 0; i < movies.length; i++){
    var b = $("<button>");
    b.addClass("btn btn-dark");
    b.addClass("movie");
    b.attr("data-name", movies[i]);
    b.text(movies[i]);
    $("#movie-buttons").append(b);
  }
}     

//runs a function to create a button based on the input typed when the add topic button is clicked
$("#add-topic").on("click", function(event){
//prevents the page from refreshing on the click
  event.preventDefault();
//stores the typed input as a variable
  var topic = $("#topic-input").val().trim();
//pushed the input variable into the topics array
  topics.push(topic);
//runs the render function to display the new button 
  renderButtons();
// change the input box value to empty
  $("#topic-input").val("");
})

//adds a listener to all buttons with the topic class to run the display topic function
$(document).on("click", ".topic", displayTopic);

//call the render function to display the buttons on the screen
renderButtons();

$("#reset-images").on("click", function(){
  event.preventDefault();
  $("#image-view").empty();
})

// just gets cats to display on the page automatically
/*
function displayCats(){

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=cat&api_key=GCc727r4Dk1UdzGryw1p7vGyOtx65UXG&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        
  data = response.data
       
  for(i=0; i<limit; i++){
     $("#image-view").append("<div class='card' class='col-4' style='max-width:200px;'>" 
     + '<img height="150" width="150" src=' + data[i].images.downsized_medium.url 
     + ' />' + "<figcaption><b>Rating: </b>" + data[i].rating + "</figcaption>")
        
     }
  });
  }

  displayCats();
*/

// function to handle the ajax call to the omdb api and allow the user to search for info on specific movies
function displayMovieInfo() {

  var movie = $(this).attr('data-name')
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data){
      $("#image-view").prepend("<br>" + '<img src=' + data.Poster + ' />' + "<br><hr>")
      $("#image-view").prepend("<br><b>Plot: </b>" + data.Plot + "<br>")
      $("#image-view").prepend("<br><b>Actors: </b>" + data.Actors + "<br>")
      $("#image-view").prepend("<b>Director(s): </b>" + data.Director + "<br>")
      $("#image-view").prepend("<b><br>Released: </b>" + data.Released + " ")
      $("#image-view").prepend("<b>Runtime: </b>" + data.Runtime + "<br>")
      $("#image-view").prepend("<b>Rated: </b>" + data.Rated + " ")
      $("#image-view").prepend("<br><b>Title: </b>" + data.Title)
      $("#image-view").prepend("<br><hr>")
  })
}
// will add a button to a list which will trigger the actual movie info dump to the screen
$("#add-movie").on("click", function(event){
  event.preventDefault()

  var movie = $("#movie-input").val().trim()

  movies.push(movie)

  renderButtons();

  $("#movie-input").val("");
})
// tie the movie info dump to any item with the class movie on-click
$(document).on("click", ".movie", displayMovieInfo);
})
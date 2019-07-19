
  


//create an array to hold the initial topics to choose from for the gif search
var topics = ["cat", "dog", "bird", "fish", "elephant", "cow", "goat", "tiger", "lizard", "sheep"]
//defines the max number of images on the screen for the given topic
limit=10;

console.log(topics)

//function to run an ajax query to the giphy database and append the appropriate data to the div for images
function displayTopic(){

var topic = $(this).attr("data-name")
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=GCc727r4Dk1UdzGryw1p7vGyOtx65UXG&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
      
var data = response.data

console.log(data)    
      
for(i=0; i<limit; i++){
   $("#image-view").append("<div class='card' style='max-width:200px;'>" 
   + '<img height="150" width="150" src=' + data[i].images.downsized_medium.url 
   + ' />' + "<figcaption><b>Rating: </b>" + data[i].rating + "</figcaption>")
      
   }
});
}


//function to display the buttons compiled from our array of topics
function renderButtons(){
//prevents repeat buttons from being created
  $("#buttons").empty()
//loop through the array of topics
    for(var i = 0; i < topics.length; i++){
//create a button for each topic in the array  
     var a = $("<button>")
//bootstrap style class
     a.addClass("btn btn-light")
//add the class of topic
     a.addClass("topic")
//add the data attribute 
     a.attr("data-name", topics[i])
//give each button text specific to the topic
     a.text(topics[i])
//append the button to the buttons div
     $("#buttons").append(a)

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
})

//adds a listener to all buttons with the topic class to run the display topic function
$(document).on("click", ".topic", displayTopic);

//call the render function to display the buttons on the screen
renderButtons();

//just gets cats to display on the page automatically
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
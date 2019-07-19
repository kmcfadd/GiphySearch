
          // Example queryURL for Giphy API
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=cat&api_key=GCc727r4Dk1UdzGryw1p7vGyOtx65UXG&limit=10";
          limit = 10;

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
      
            var data = response.data
            console.log(data)
            console.log(data[0].rating)
      
      
              for(i=0; i<limit; i++){
                $("#image-view").append("<div class='card' class='col-4' style='max-width:200px;'>" + '<img height="150" width="150" src=' + data[i].images.downsized_medium.url + ' />' + "<figcaption><b>Rating: </b>" + data[i].rating + "</figcaption>")
      
              }
      
          });
      

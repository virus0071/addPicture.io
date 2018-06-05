var cars = ["Benz S63 AMG", "BMW 760Li", "Volkswagen Touareg", "Volvo XC90", "Benz E350", "Volkswagen Beetle", "Dodge Charger"];


function displayCarInfo(){
    renderButtons();      
}


function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < cars.length; i++) {
        var a = $("<button>");
        a.addClass("car");
        a.attr("data-name", cars[i]);
        a.text(cars[i]);
        $("#buttons-view").append(a);
    }
  }

$("#add-car").on("click", function(event) {
    event.preventDefault();
    var car = $("#car-input").val().trim();
    cars.push(car);
    console.log(cars);
    renderButtons();
});

$(document).on("click", ".car", displayCarInfo);
renderButtons();

$(document).on("click", ".car", function() {
    $("#add-car").removeClass("active");
    $(this).addClass("active");

    var car = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        })

        .then(function(response) {
          console.log(queryURL);

          console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var carDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var carImage = $("<img>");
            carImage.attr("src", still);
            carImage.attr("data-still", still);
            carImage.attr("data-animate", animated);
            carImage.attr("data-state", "still");
            carImage.addClass("carImages");

            carDiv.append(p);
            carDiv.append(carImage);
            $("#images-view").prepend(carDiv);
        }
      });
  });

  $(document).on("click", ".carImages", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

  });



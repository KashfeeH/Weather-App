var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];
var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];

//The todayWeather function is designed to fetch and display current weather data 
//for a given city using the OpenWeatherMap API

function todayWeather(cityData) {
  $("#today").empty();
  var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" + cityData + "&units=metric&appid=" + apiKey;
  fetch(queryURL)
  .then(response => response.json())
  .then(data => {
  var date = dayjs().format('DD/MMM/YYYY');
  var image = $("<img>").attr("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
  var weathrDiv = $("<div id='weathrDiv'>");
      weathrDiv.addClass("text-light");
      var temp = data.main.temp;
      var newH4 = $("<h4>").text(data.name + " (" + date + ") ");
      newH4.append(image);
      weathrDiv.append(newH4);
      weathrDiv.append($("<p>").text("Temperature: " + temp.toFixed(2) + " C"));
      weathrDiv.append($("<p>").text("Wind Speed: " + data.wind.speed + " KPH"));
      weathrDiv.append($("<p>").text("Humidity: " + data.main.humidity + "%"));
      $("#today").prepend(weathrDiv);
      fivedayForecast(cityData);
    });
}
//The cityList() function in your code is responsible for populating 
//the list with cities the user will search for.
function cityList() {
  $("#history").empty();
  if (cityStorage.length === 0) return;
  for (var i = 0; i < cityStorage.length; i++) {
    var newLi = $("<li>");
    newLi.addClass("li-city list-group-item");
    newLi.attr("data-city", cityStorage[i]);
    newLi.text(cityStorage[i]);
    $("#history").prepend(newLi);
  }
  todayWeather(cityStorage[cityStorage.length - 1]);
}
//he fivedayForecast() function is designed to fetch the 5-day 
//forecast for a given city from the OpenWeatherMap API and display it in the HTML

function fivedayForecast(cityData) {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + cityData + "&units=metric&appid=" + apiKey;
fetch(queryURL)
.then(response => response.json())
.then(data => {
  $('#forecast').empty();
  var fiveH4 = $("<h4>").text("Forecast for the Next 5 days");
  $('#forecast').append(fiveH4);
  var fiveDiv = $("#forecast");
  fiveDiv.empty();
  for (var i = 0; i <= data.list.length -1; i++) {
    var time = data.list[i].dt_txt;
    if (time.includes("15:00:00")) {
      var colSm = $("<div>").addClass("col-sm-2 bg-forecast text-light forecastList");
      var image = $("<img>").attr("src","https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
      var temp = data.list[i].main.temp;
      var newDate = dayjs.unix(data.list[i].dt).format("DD/MM/YYYY");
      colSm.append("<h5 class ='text-center header'>"+ newDate + "</h5>");
      colSm.append(image);
      colSm.append(
        $("<p>").text("Temperature: " + temp.toFixed(2)+ " C")
      );
      colSm.append(
        $("<p>").text("Wind Speed: " + data.list[i].wind.speed + " KPH") 
      );
      colSm.append(
        $("<p>").text("Humidity: " + data.list[i].main.humidity + "%")
      );
      fiveDiv.append(colSm);
    }
  }
});
}

$("#search-button").on("click", function(event) {
  $("#search-input").empty();
  event.preventDefault();
  var cityForm = $("#search-input").val().trim();
  if (cityForm === "") return;
  cityStorage.push(cityForm);
  localStorage.setItem("cities", JSON.stringify(cityStorage));
  $("#search-input").val("");
  cityList();
});

//Makes the City List clickable to show current temperature & five day temp

$("#history").on("click", ".li-city", function() {
  todayWeather($(this).attr("data-city"));
});
cityList();

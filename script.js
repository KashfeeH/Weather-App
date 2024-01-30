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
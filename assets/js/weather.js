//global variables
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
let savedCity = document.getElementById('savedCity');

//API key
var APIKey = "a0aca8a89948154a4182dcecc780b513";

// Display the current and future weather based on search box input
function displayWeather(event) {
  event.preventDefault();
  city = searchCity.val().trim();
  currentWeather(city);
}

function currentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // parse the response to display the current weather including the City name. the Date and the weather icon.
    console.log(response);
    var weathericon = response.weather[0].icon;
    var iconurl =
      "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    new Date(response.dt * 1000).toLocaleDateString();
    //parse the response for name of city and concanatig the date and icon.
    $(currentCity).html(response.name + "<img src=" + iconurl + ">");
    // parse the response to display the current temperature.
    // Convert the temp to fahrenheit

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(currentTemperature).html(tempF.toFixed(0) + "&#8457");
    // Display the Humidity
    $(currentHumidty).html(response.main.humidity + "%");
    //Display Wind speed and convert to MPH
    var ws = response.wind.speed;
    var windsmph = (ws * 2.237).toFixed(1);
    $(currentWindSpeed).html(windsmph + "MPH");
    // Display UVIndex.
    UVIndex(response.coord.lon, response.coord.lat);
    forecast(response.id);
    if (response.cod == 200) {
      sCity = JSON.parse(localStorage.getItem("cityname")) || [];
      console.log(sCity);
      displaySavedCities();
      if (sCity == null) {
        sCity = [];
        // sCity.push(city.toUpperCase());
      } else {
        if (find(city) > 0) {
          // sCity.push(city.toUpperCase());
        }
      }
      storeCities(sCity.value, response);
    }
  });
}

// display saved citites onto the page
function displaySavedCities() {
  for (i = 0; i < sCity.length; i++) {
    savedCity.innerHTML = savedCity.innerHTML + ` <li class="list-group-item"> <button class="button cities"> ${sCity[i]} </button> </li> `
  }
  let cities = document.querySelectorAll('.cities')

  for (i = 0; i < cities.length; i++) {
    cities[i].addEventListener('click', function () {
      console.log(this.textContent)
      currentWeather(this.textContent);
    })
  }
  // currentWeather(sCity[sCity.length-1]); 
};


function UVIndex(ln, lt) {
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    $(currentUvindex).html(response.value);
  });
}

//display the 5 days forecast for the current city.
function forecast(cityid) {
  var queryforcastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityid +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryforcastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (i = 0; i < 5; i++) {
      var date = new Date(
        response.list[(i + 1) * 8 - 1].dt * 1000
      ).toLocaleDateString();
      var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      var tempK = response.list[(i + 1) * 8 - 1].main.temp;
      var tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(0);
      var humidity = response.list[(i + 1) * 8 - 1].main.humidity;
      $(".cards-container").addClass("card");
      $("#fDate" + i).html(date);
      $("#fImg" + i).html("<img src=" + iconurl + ">");
      $("#fTemp" + i).html("Temp: " + tempF + "&#8457");
      $("#fHumidity" + i).html("Humidity: " + humidity + "%");
    }
  });
}
//Click Handlers
$("#search-button").on("click", displayWeather);

// store into local storage
function storeCities(city, cityData) {
  if (sCity.includes(cityData.name)) { // if value already exists - don't push to array
    console.log('ALREADY EXISTS DONT PUSH ME')
  } else { // else if- value does not exist- push to array
    sCity.push(cityData.name);
    localStorage.setItem("cityname", JSON.stringify(sCity));
  }
};

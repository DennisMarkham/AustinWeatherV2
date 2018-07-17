 var config = {
    apiKey: "AIzaSyDejtrnCKoCZh3ag_myOjj__hRRZ8UPHHQ",
    authDomain: "weatherhistory-17f4b.firebaseapp.com",
    databaseURL: "https://weatherhistory-17f4b.firebaseio.com",
    projectId: "weatherhistory-17f4b",
    storageBucket: "weatherhistory-17f4b.appspot.com",
    messagingSenderId: "62885115403"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
    // This is our API key

    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Austin,Texas&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        // Transfer content to HTML
        console.log(response.weather["0"].main);

        console.log(response.main.temp);

        console.log(response.weather["0"].id);

        if(response.weather["0"].id < 300)
        {
          $("#weather_img").attr("src", "images/lightening_clouds.png")
        }
        else if (response.weather["0"].id < 600)
        {
          $("#weather_img").attr("src", "images/rain_clouds.png")
        }
        else if (response.weather["0"].id == 615 || response.weather["0"].id == 616 || response.weather["0"].id == 611)
        {
          $("#weather_img").attr("src", "images/snow_rain.png")
        }
        else if (response.weather["0"].id < 700)
        {
          $("#weather_img").attr("src", "images/snow.png")
        }
        else if (response.weather[0].id == 781)
        {
          $("#weather_img").attr("src", "images/tornado.png")
        }
        else if (response.weather[0].id == 761)
        {
          $("#weather_img").attr("src", "images/volcano.png")
        }
        else if (response.weather[0].id == 701 || response.weather[0].id == 741 || response.weather[0].id == 721)
        {
          $("#weather_img").attr("src", "images/fog.png")
        }
         else if (response.weather[0].id == 731 || response.weather[0].id == 751 || response.weather[0].id == 761)
        {
          $("#weather_img").attr("src", "images/tumbleweed.png")
        }
        else if (response.weather[0].id == 800)
        {
          $("#weather_img").attr("src", "images/sun.png")
        }
        else if (response.weather[0].id > 800)
        {
          $("#weather_img").attr("src", "images/clouds.png")
        }
        else
        {
          $("#weather_img").attr("src", "images/sun.png")
        }
        //still need volcano.  Well, do I?







        $("#weather").text(response.weather["0"].description);

        if (response.main.temp > 100)
        {
          $("#temp").text("Scorching!");
          $("#temp").attr("style","color:red;");
          
        }
        else if (response.main.temp > 85)
        {
          $("#temp").text("Hot");



        } 
        else if (response.main.temp > 70)
        {
          $("#temp").text("Warm");
          $("#temp").attr("style","color:#E6AE18;");

        }
        else if (response.main.temp > 55)
        {
          $("#temp").text("Temperate");
          $("#temp").attr("style","color:green;");
        }
        else if (response.main.temp > 40)
        {
          $("#temp").text("Cool");
          $("#temp").attr("style","color:#18CAE6;");
        }
        else
        {
          $("#temp").text("Cold!");
          $("#temp").attr("style","color:blue;");
        }

        $("#degrees").text(response.main.temp);
       
        // Log the data in the console as well
      });

      //2XX Thunderstorms
      //3XX Drizzle
      //5XX Rain
      //6XX Snow
      //7XX Atmosphere ()
      //800 Clear
      //80X Clouds

      //My categories: Thunderstorms 200-299, Rain 300 - 500, Snow (include 711, squawls?), Snow and Rain (615, 616, 611), Clear, Cloudy (should include "few clouds?" 801), Tornado (781), Volcanic Ash (762), Fog (701, 741, 721).  Dust = (731, 751, 761)

      //night and day pics? 9 pics if no night/day varients.  

//Now, the history part starts here:

$("button").on("click", function(event) {
  event.preventDefault();

var date = moment().format("MM/DD/YYYY  hh:mm a");
var temp = $("#degrees").text();
var weather = $("#weather").text();
var img = $("#weather_img").attr("src");

console.log("Date: " + date);
console.log("Temperature: " + temp);
console.log("Weather: " + weather);
console.log("Image: " + img);

  var loggedWeather = {
    date: date,
    temp: temp,
    weather: weather,
    img: img
  };

  database.ref().push(loggedWeather);

  //wow it actually...it worked.  Now how do I print all of this?

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log("child snapshot: " + childSnapshot.val());

  // Store everything into a variable.
  var loggedDate = childSnapshot.val().date;
  var loggedTemp = childSnapshot.val().temp;
  var loggedWeather = childSnapshot.val().weather;
  var loggedImg = childSnapshot.val().img;

  // Employee Info
  console.log(loggedDate);
  console.log(loggedTemp);
  console.log(loggedWeather);
  console.log(loggedImg);

  $("#logged").prepend("<span> Temperature: " + loggedTemp + "</span><br><span>Weather: " + 
    loggedWeather + "</span><br><span>Date: " + loggedDate + "</span><br><hr>");
  
  //you've done it.  Now you just need to impose some kind of limit.
  //but maybe that's for another time
  })
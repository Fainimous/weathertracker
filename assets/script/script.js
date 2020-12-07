//if there is a history array stored locally, create the history below the search button and load the most recent search
function init(){
    var savedhistory = [JSON.parse(localStorage.getItem("cityhistory"))];
    console.log(savedhistory);
    if (savedhistory.length === 1) {
        console.log("starting");
        var history = [JSON.parse(localStorage.getItem("cityhistory"))];
        console.log(history);
        $('#previousHistory').text("");
        var divEL = $('<div id="searchhistory">');
        var paraEL = $('<p>');
        paraEL.text(history);
        divEL.append(paraEL);
        $('#previousHistory').prepend(divEL);
        //getCurrentForecast();
    }

    if (savedhistory.length >= 2) {
        var history = JSON.parse(localStorage.getItem("cityhistory"));
        $('#previousHistory').text("");
            for (i = 0; i < history.length; i++){
                var divEL = $('<div id="searchhistory">');
                var paraEL = $('<p>');
                paraEL.text(history[i]);
                divEL.append(paraEL);
                $('#previousHistory').prepend(divEL);
            }
        //getCurrentForecast();
    }
}
// when button is clicked to search, then make an API call for both the current and 5 day forecast and populate the HTM with the results.
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, 
//the temperature, the humidity, the wind speed, and the UV index
$("#btn").on("click", function() {
    var search = $("#userSearch").val();

    if (localStorage.getItem("cityhistory") === null){
        var history = search;
        localStorage.setItem("cityhistory", JSON.stringify(history));
    }
    else {
        var history = [JSON.parse(localStorage.getItem("cityhistory"))];
        console.log(history);
        history.push(search);
        localStorage.setItem("cityhistory", JSON.stringify(history));
    }

    var APIKey = "c6ab1afd14a1f70b8f64b188304d2372";
    var currentRequestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: currentRequestURL,
        method: "GET"
    }).then(function (response) {
        $('#currentinfo').text("");
        console.log(response);
        var cardDivEL = $('<div class="card">');
        var cityDateEL = $('<h2> id="citydate">');
        var iconEL = $('<img>');
        var tempEL = $('<p>');
        var humidityEL = $('<p>');
        var windSpeedEL = $('<p>');
       // var uvIndexEL = $('<p id="uv">');
        var cityName = response.name;
        var date = new Date().toLocaleDateString();
        var iconCode = response.weather[0].icon;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        //var uvIndex = 
        cityDateEL.text(cityName + "  " + date);
        iconEL.attr("src", "http://openweathermap.org/img/wn/" + iconCode +"@2x.png");
        tempEL.text("Temperature: " + temp + "F");
        humidityEL.text("Humidity: " + humidity);
        windSpeedEL.text("Windspeed: " + windSpeed);
        cityDateEL.append(iconEL);
        (cardDivEL).append(cityDateEL, tempEL, humidityEL, windSpeedEL);
        $('#currentinfo').append(cardDivEL);
        // getUVIndex();
        getFiveDayForecast();

    })
})

//get the UV index and append to the currentinfo div
function getUVIndex() {

}

//get current forecast
function getCurrentForecast() {
    var search = $("#searchhistory").text();
    $("#userSearch").val(search);
    var APIKey = "c6ab1afd14a1f70b8f64b188304d2372";
    var currentRequestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: currentRequestURL,
        method: "GET"
    }).then(function (response) {
        $('#currentinfo').text("");
        console.log(response);
        var cardDivEL = $('<div class="card">');
        var cityDateEL = $('<h2> id="citydate">');
        var iconEL = $('<img>');
        var tempEL = $('<p>');
        var humidityEL = $('<p>');
        var windSpeedEL = $('<p>');
       // var uvIndexEL = $('<p id="uv">');
        var cityName = response.name;
        var date = new Date().toLocaleDateString();
        var iconCode = response.weather[0].icon;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        //var uvIndex = 
        cityDateEL.text(cityName + "  " + date);
        iconEL.attr("src", "http://openweathermap.org/img/wn/" + iconCode +"@2x.png");
        tempEL.text("Temperature: " + temp + "F");
        humidityEL.text("Humidity: " + humidity);
        windSpeedEL.text("Windspeed: " + windSpeed);
        cityDateEL.append(iconEL);
        (cardDivEL).append(cityDateEL, tempEL, humidityEL, windSpeedEL);
        $('#currentinfo').append(cardDivEL);
        // getUVIndex();
        getFiveDayForecast();
    })
}

//get the 5 day forecast and populate to the fiveday div
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, 
//an icon representation of weather conditions, the temperature, and the humidity

function getFiveDayForecast() {
    var search = $("#userSearch").val();
    var APIKey = "c6ab1afd14a1f70b8f64b188304d2372";
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + APIKey + "&cnt=5&units=imperial";

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#fiveday').text("");
        for (var i = 0; i < 5; i++) {
        var cardDivEL = $('<div class="card">');
        var cityDateEL = $('<h2> id="citydate">');
        var iconEL = $('<img>');
        var tempEL = $('<p>');
        var humidityEL = $('<p>');
        var date = new Date(new Date().setDate(new Date().getDate() + i)).toLocaleDateString();
        var iconCode = response.list[i].weather[0].icon;
        var temp = response.list[i].main.temp;
        var humidity = response.list[i].main.humidity;
        cityDateEL.text(date);
        iconEL.attr("src", "http://openweathermap.org/img/wn/" + iconCode +"@2x.png");
        tempEL.text("Temperature: " + temp + "F");
        humidityEL.text("Humidity: " + humidity);
        cityDateEL.append(iconEL);
        cardDivEL.append(cityDateEL, tempEL, humidityEL);
        $('#fiveday').append(cardDivEL);
        console.log(date);
        }
    }

    )}
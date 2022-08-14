var searchText = "Madison";
var fetchButton = document.getElementById('searchBtn');



function getLocation() {
    // location api call
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ searchText +'&limit=1&appid=91ea17223475ce111fab7ed38d34168a';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.dir(data);
        for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
        console.log(data[i].state);
        console.log(data[i].lat.toString());
        console.log(data[i].lon.toString());
        getWeather(data[i].lat.toString(),data[i].lon.toString());
        }
      });
  }
  //button click to grab text entered by user
  fetchButton.addEventListener('click', getLocation);

  //Function to use Latitude and Longitude to get weather of location
  function getWeather(lt,ln) {
    // Weather api call
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lt +'&lon='+ ln +'&appid=91ea17223475ce111fab7ed38d34168a';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.dir(data);
        console.log("########Current#######")
        console.log(data.current);
        console.log("########Daily#######")
        console.log(data.daily);
      });
  }
  
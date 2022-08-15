//var searchText = "Madison";
var fetchButton = document.getElementById('searchBtn');
var key = "91ea17223475ce111fab7ed38d34168a";
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var currentDay = document.getElementById('curentWeather');
//var elHistory = document.getElementById('history');

//##########
//##########
//##########
//PLEASE NOTE THE UV SECTION IS NOW PART OF THE PAY SIDE OF THE API
//BOOTCAMP INSTRUCTOR SAID TO NOT SIGN UP, THEREFOR UNABLE TO COMPLETE UV SECTION OF THIS ASSIGNMENT
//##########
//##########
//##########
function loadHistory() {
    var elHistory = document.getElementById('history');
    // add history
    var storageName = "weatherApp"
    if (localStorage.getItem(storageName) === null) {
        console.log("storage Null");
    } else {
        //console.log("StorageName: "+storageName);
        var storedItems = JSON.parse(localStorage.getItem(storageName));
        console.log(storedItems)
        const liHis = document.createElement("li");
        liHis.innerText = storedItems.City + "," + storedItems.state;
        console.log(liHis);
        elHistory.appendChild(liHis);
    }
}

window.onload = loadHistory();

function getLocation() {
    removeChildren();
    var elText = document.getElementById('reqCity').value;
    console.log(elText);
    // location api call
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + elText + '&limit=1&appid=' + key;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.dir(data);
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].name);
                // console.log(data[i].state);
                // console.log(data[i].lat.toString());
                // console.log(data[i].lon.toString());


                //get name and state to save
                var saveObject = { City: data[i].name, State: data[i].state };

                localStorage.setItem("weatherApp", JSON.stringify(saveObject));

                getWeather(data[i].lat.toString(), data[i].lon.toString(), data[i].name, data[i].state);
            }
        });
}
//button click to grab text entered by user
fetchButton.addEventListener('click', getLocation);

//Function to use Latitude and Longitude to get weather of location
function getWeather(lt, ln, cty, st) {
    // Weather api call
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lt + '&lon=' + ln + '&appid=' + key + '&units=imperial';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.dir(data);
            //City
            const curCty = document.createElement("p");
            curCty.innerText = "City: " + cty;
            currentDay.appendChild(curCty);
            //State
            const curSt = document.createElement("p");
            curSt.innerText = "State: " + st;
            currentDay.appendChild(curSt);


            var currentDate = new Date(data.current.dt * 1000);
            //Current Date
            const curDt = document.createElement("p");
            curDt.innerText = "Today is " + currentDate.toLocaleString();
            currentDay.appendChild(curDt);
            //Current Wind
            const curWnd = document.createElement("p");
            curWnd.innerText = "Current Wind Speed: " + data.current.wind_speed;
            currentDay.appendChild(curWnd);
            //Curent Humidity
            const curHum = document.createElement("p");
            curHum.innerText = "Current Humidity: " + data.current.humidity;
            currentDay.appendChild(curHum);
            //Current Temp
            const curtmp = document.createElement("p");
            curtmp.innerText = "Current Temp: " + data.current.temp;
            currentDay.appendChild(curtmp);


            //Get 5 day forecast
            for (i = 0; i < 5; i++) {
                var el = null

                if (i == 0) {
                    el = day1;

                } else if (i == 1) {
                    el = day2;

                } else if (i == 2) {
                    el = day3;

                } else if (i == 3) {
                    el = day4;

                } else if (i == 4) {
                    el = day5;

                } else {
                    console.log("false")
                }

                var myDate = new Date(data.daily[i].dt * 1000);

                const Dt = document.createElement("p");
                Dt.innerText = "Date: " + myDate.toLocaleString();
                el.appendChild(Dt);
                //Current Wind
                const Wnd = document.createElement("p");
                Wnd.innerText = "Wind Speed: " + data.daily[i].wind_speed;
                el.appendChild(Wnd);
                //Curent Humidity
                const Hum = document.createElement("p");
                Hum.innerText = "Humidity: " + data.daily[i].humidity;
                el.appendChild(Hum);
                //Low Temp
                const lowtmp = document.createElement("p");
                lowtmp.innerText = "Daily Low: " + data.daily[i].temp.min;
                el.appendChild(lowtmp);
                //High Temp
                const hightmp = document.createElement("p");
                hightmp.innerText = "Daily High: " + data.daily[i].temp.max;
                el.appendChild(hightmp);
            }

        });
}

function removeChildren() {

    while (currentDay.lastChild) {
        currentDay.removeChild(currentDay.lastChild);
    }
    while (day1.lastChild) {
        day1.removeChild(day1.lastChild);
    }
    while (day2.lastChild) {
        day2.removeChild(day2.lastChild);
    }
    while (day3.lastChild) {
        day3.removeChild(day3.lastChild);
    }
    while (day4.lastChild) {
        day4.removeChild(day4.lastChild);
    }
    while (day5.lastChild) {
        day5.removeChild(day5.lastChild);
    }
    return;

}

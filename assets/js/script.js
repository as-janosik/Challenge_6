//var searchText = "Madison";
var fetchButton = document.getElementById('searchBtn');
var key = "91ea17223475ce111fab7ed38d34168a";
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var hisBtn1 = document.getElementById('his1');
var hisBtn2 = document.getElementById('his2');
var hisBtn3 = document.getElementById('his3');
var hisBtn4 = document.getElementById('his4');
var hisBtn5 = document.getElementById('his5');
var currentDay = document.getElementById('curentWeather');
var searchHisArr = [];
//var elHistory = document.getElementById('history');

//##########
//##########
//##########
//PLEASE NOTE THE UV SECTION IS NOW PART OF THE PAY SIDE OF THE API
//BOOTCAMP INSTRUCTOR SAID TO NOT SIGN UP, THEREFOR UNABLE TO COMPLETE UV SECTION OF THIS ASSIGNMENT
//##########
//##########
//##########

function addToArr(str) {
    if (searchHisArr.length < 5) {
        searchHisArr.push(str);
    } else {
        searchHisArr.shift();
        searchHisArr.push(str);
    }
    console.dir(searchHisArr);
}

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
        searchHisArr = storedItems;
        for (var i = 0; i < searchHisArr.length; i++) {
            //const liHis = document.createElement("li");
            if(i===0){
                hisBtn1.innerText = searchHisArr[i];
            }else if (i===1){
                hisBtn2.innerText = searchHisArr[i];
            }else if (i===2){
                hisBtn3.innerText = searchHisArr[i];
            }else if (i===3){
                hisBtn4.innerText = searchHisArr[i];
            }else if (i===4){
                hisBtn5.innerText = searchHisArr[i];
            }
            //liHis.innerText = searchHisArr[i];
            // console.log(liHis);
            //elHistory.appendChild(liHis);
        }
    }
}

window.onload = loadHistory();

function getLocation() {
    removeChildren();
    console.log(this);
    if(this.id =='his1' ){
        var elText = this.innerText;
    } else if(this.id =='his2'){
        var elText = this.innerText;
    }else if(this.id =='his3'){
        var elText = this.innerText;
    }else if(this.id =='his4'){
        var elText = this.innerText;
    }else if(this.id =='his5'){
        var elText = this.innerText;
    }else{
        var elText = document.getElementById('reqCity').value;
    }
    //var elText = document.getElementById('reqCity').value;
    console.log(elText);
    // location api call
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + elText + '&limit=1&appid=' + key;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.dir(data);
            for (var i = 0; i < data.length; i++) {

                var saveObject = data[i].name + "," + data[i].state;
                addToArr(saveObject);

                localStorage.setItem("weatherApp", JSON.stringify(searchHisArr));

                getWeather(data[i].lat.toString(), data[i].lon.toString(), data[i].name, data[i].state);
            }
        });
}
//button click to grab text entered by user
fetchButton.addEventListener('click', getLocation);
hisBtn1.addEventListener('click', getLocation);
hisBtn2.addEventListener('click', getLocation);
hisBtn3.addEventListener('click', getLocation);
hisBtn4.addEventListener('click', getLocation);
hisBtn5.addEventListener('click', getLocation);

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
                //set element to use
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

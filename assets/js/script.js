var searchText = "Madison";
var fetchButton = document.getElementById('searchBtn');
var key = "91ea17223475ce111fab7ed38d34168a";
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var currentDay = document.getElementById('curentWeather');

//##########
//##########
//##########
//PLEASE NOTE THE UV SECTION IS NOW PART OF THE PAY SIDE OF THE API
//BOOTCAMP INSTRUCTOR SAID TO NOT SIGN UP, THEREFOR UNABLE TO COMPLETE UV SECTION OF THIS ASSIGNMENT
//##########
//##########
//##########

function getLocation() {
    // location api call
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchText + '&limit=1&appid=' + key;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.dir(data);
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i].name);
                // console.log(data[i].state);
                // console.log(data[i].lat.toString());
                // console.log(data[i].lon.toString());
                getWeather(data[i].lat.toString(), data[i].lon.toString());
            }
        });
}
//button click to grab text entered by user
fetchButton.addEventListener('click', getLocation);

//Function to use Latitude and Longitude to get weather of location
function getWeather(lt, ln) {
    // Weather api call
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lt + '&lon=' + ln + '&appid=' + key + '&units=imperial';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var currentDate = new Date(data.current.dt*1000);
            //Current Date
            const curDt = document.createElement("p");
            curDt.innerText = currentDate.toLocaleString();
            currentDay.appendChild(curDt);
            //Current Wind
            const curWnd = document.createElement("p");
            curWnd.innerText = data.current.wind_speed;
            currentDay.appendChild(curWnd);
            //Curent Humidity
            const curHum = document.createElement("p");
            curHum.innerText = data.current.humidity;
            currentDay.appendChild(curHum);
            //Current Temp
            const curtmp = document.createElement("p");
            curtmp.innerText = data.current.temp;
            currentDay.appendChild(curtmp);


            //Get 5 day forecast
            for (i = 0; i < 5; i++) {
                var el = null
                
                if (i == 0){
                    el = day1;
                    
                }else if(i==1){
                    el = day2;
                    
                }else if(i==2){
                    el = day3;
                    
                }else if(i==3){
                    el = day4;
                    
                }else if(i==4){
                    el = day5;
                    
                }else{
                    console.log("false")
                }

                 var myDate = new Date(data.daily[i].dt*1000);

                const Dt = document.createElement("p");
                Dt.innerText = myDate.toLocaleString();
                el.appendChild(Dt);
                //Current Wind
                const Wnd = document.createElement("p");
                Wnd.innerText = data.daily[i].wind_speed;
                el.appendChild(Wnd);
                //Curent Humidity
                const Hum = document.createElement("p");
                Hum.innerText = data.daily[i].humidity;
                el.appendChild(Hum);
                //Low Temp
                const lowtmp = document.createElement("p");
                lowtmp.innerText = data.daily[i].temp.min;
                el.appendChild(lowtmp);
                //High Temp
                const hightmp = document.createElement("p");
                hightmp.innerText = data.daily[i].temp.max;
                el.appendChild(hightmp);
            }

        });
}

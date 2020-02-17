var appid = '4bf84e4367804d320b638aafcdb5fa1d';
var units ='Metric';
var searchMethod='zip';

function getSearchMethod(searchTerm){
	if(searchTerm.length===5 && Number.parseInt(searchTerm)+''===searchTerm)
		searchMethod='zip';
	else
		searchMethod='q';
}

function searchWeather(searchTerm){
	getSearchMethod(searchTerm)
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result =>{
		return result.json();
	}).then(result=>{
		init(result);
	})
}

function init(resultFromServer){
	//console.log(resultFromServer);
	switch(resultFromServer.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage='url("img/clear.jpg")';
			break;
		case "Clouds":
			document.body.style.backgroundImage='url("img/cloudy.jpg")';
			break;
		case "Mist":
			document.body.style.backgroundImage='url("img/mist.jpg")';
			break;
		case "Rain":
			document.body.style.backgroundImage='url("img/rain.jpg")';
			break;
		case "Thunderstorm":
			document.body.style.backgroundImage='url("img/thunderstorm.jpg")';
			break;
		case "Snow":
			document.body.style.backgroundImage='url("img/snow.jpg")';
			break;
		default:

			break;
	}

	var weatherDescHeader= document.getElementById('weatherDescHeader');
	var tempHeader = document.getElementById('temperature');
	var humidtyHeader = document.getElementById('humidty');
	var windSpeed = document.getElementById('windSpeed');
	var cityHeader= document.getElementById('cityHeader');
	var weatherIcon = document.getElementById('documentIconImg');
	weatherIcon.src='http://openweathermap.org/img/w/'+resultFromServer.weather[0].icon+'.png';
	var weatherDesc= resultFromServer.weather[0].description;
	weatherDescHeader.innerText= weatherDesc.charAt(0).toUpperCase()+ weatherDesc.slice(1);

	tempHeader.innerHTML = Math.floor(resultFromServer.main.temp)+'&#176';
	windSpeed.innerHTML= 'Wind at '+Math.floor(resultFromServer.wind.speed)+' m/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidty.innerHTML = 'Humidity level at ' + resultFromServer.main.humidity+' %';


	setPositionWeather();
}


function setPositionWeather(){
	var weatherContainer = document.getElementById('weatherContainer');
	var weatherContainerHeight = weatherContainer.clientHeight;
	var weatherContainerWidth = weatherContainer.clientWidth;

	weatherContainer.style.left = `calc(50%-${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50%-${weatherContainerHeight/1.3}px)`;
	weatherContainer.style.visibility='visible';
}

function showPosition(position) {
  var lat =position.coords.latitude;
  var long =position.coords.longitude;
	fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${appid}&units=${units}`).then(result =>{
		return result.json();
	}).then(result=>{
		init(result);
	})
}

document.getElementById('searchBtn').addEventListener('click',()=>{
	var  searchTerm = document.getElementById('searchInput').value;
	if(searchTerm)
		searchWeather(searchTerm);
})

document.getElementById('geoBtn').addEventListener('click',()=>{
	navigator.geolocation.getCurrentPosition(showPosition);
})
angular.module("task1", ['WeatherService']);

angular.module('task1')
        .controller('TaskController', ['$scope', 'WeatherRequest', TaskController]);
		
function TaskController($scope, WeatherRequest) {
	//definition of position class constructor
	$scope.position  = function (latitude, longitude){
		this.latitude = latitude;
		this.longitude = longitude;
    }
	
	//definition of weather class constructor
	$scope.weather  = function (name, description, temp, humidity, pressure, speed){
		this.place = name;
		this.description = description;
		this.temperature = temp;
		this.humidity = humidity;
		this.pressure = pressure;
		this.windSpeed = speed;
    }	
	
	$scope.result = "OK";
	$scope.postcode = "";
	$scope.country = "";
	$scope.flagLocation = false;
	$scope.flagAnswer = false;
	$scope.flagError = false;

	$scope.permissionFunction = function() {
		var permission = confirm("Please, may I read your current location?");
		if (permission == true) {
			if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(
					function (position){ $scope.getPosition(position);}, 
					function (position){ $scope.getError(error);}
					);
			} else 	{
				$scope.result = "This browser does not support Geolocation.";
				$scope.flagError = true;
			}	
		} else {
			$scope.result = "We can not read your location because you denied the request";
			$scope.flagLocation = true;
		}
	}	
	$scope.permissionFunction(); 	
	
  	$scope.getPosition = function(position){
		//instance of the position class
		var location = new $scope.position(position.coords.latitude, position.coords.longitude);
		//access current weather data
		$scope.getWeather(location); 
	};
	
	$scope.getError = function(error){
		switch(error.code) {
			case error.PERMISSION_DENIED:
				$scope.result = "We can not read your location because you denied the request."
				break;
			case error.POSITION_UNAVAILABLE:
				$scope.result = "The location information is not available."
				break;
			case error.TIMEOUT:
				$scope.result = "Timed out for the request."
				break;
			case error.UNKNOWN_ERROR:
				$scope.result = "Unknown error occurred."
				break;
		}
		$scope.flagLocation = false;
		$scope.flagAnswer = false;
		$scope.flagError = true;
	};
	
	$scope.getWeather = function(location){
		WeatherRequest.posts(location.latitude, location.longitude).success(function (data){
			if (data.cod == "200"){
				$scope.answer = new $scope.weather(data.name, data.weather[0].description, data.main.temp, data.main.humidity, data.main.pressure, data.wind.speed);
				$scope.flagAnswer = true;
				$scope.flagError = false;
			}
			else{
				$scope.result = data.message;
				$scope.flagError = true;
				$scope.flagAnswer = false;
			}
		});
	};
	
	$scope.getWeatherByUser = function(){
		var code = $scope.postcode + "," + $scope.country;
		WeatherRequest.posts(code).success(function (data){
			if (data.cod == "200"){
				$scope.answer = new $scope.weather(data.name, data.weather[0].description, data.main.temp, data.main.humidity, data.main.pressure, data.wind.speed);
				$scope.flagAnswer = true;
				$scope.flagError = false;
			}
			else{
				$scope.result = data.message;
				$scope.flagError = true;
				$scope.flagAnswer = false;
			}
		});
		$scope.flagLocation = false;
	};
	
	$scope.Reset = function()
	{
		location.reload();
	}
  
}



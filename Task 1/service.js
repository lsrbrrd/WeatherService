angular.module('WeatherService', [])
	.factory('WeatherRequest', function($http) { 
		var path = "http://api.openweathermap.org/data/2.5/weather?";
		return {
			posts : function(lat, lon){
				//lat={lat}&lon={lon}
				answer = $http.get(path + 'lat=' + lat + '&lon=' + lon + '&APPID=f43b4783f283d7b4dbe21444fd703644');
				return answer;
			},
			posts : function(code){
				answer = $http.get(path + 'zip=' + code + '&APPID=f43b4783f283d7b4dbe21444fd703644');
				return answer;	
			}	
		}
	});

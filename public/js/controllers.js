var appCon = angular.module('appCon', []);

appCon.controller('pageCon', ['$scope', 'testService',  function($scope, testService){
	
	$scope.find = function(){

		testService.findAllData($scope.findText).success(function(data){
			$scope.content = data;
			//console.log($scope.content)
		});		
	}

	$scope.Input = function(){
		testService.inputData($scope.inputName, $scope.inputText).success(function(data){
			console.log(data)
		})


	}

	$scope.loadAll = function(){
		testService.loadData().success(function(data){
			$scope.allContents = data;
			//console.log(data)
		})
	}
	



}])



app.factory('testService', function($http){
	var factory = {
		loadData: function(){
			return $http.get('/test');
		},

		findAllData: function(findname){
			var data = {name: findname}
			return $http.post('/find', data);
		},
		inputData: function(name, text){
			var data = {name: name, text: text}
			return $http.post('/test', data);
		}
	}
	return factory;
});
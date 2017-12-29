
$().ready(function() {
	var app = angular.module('myApp', []);
	app.controller('personCtrl', function($scope) {
	    $scope.firstName = "John";
	    $scope.lastName = "Doe";
	    $scope.myVar = false;
	    $scope.toggle = function() {
	        $scope.myVar = !$scope.myVar;
	    }
	});
});


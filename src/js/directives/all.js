var app = angular.module('ruiComponents');

app.directive('ruiComponents', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/_all.html',
		replace: true
	};
});
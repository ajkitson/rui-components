var app = angular.module('ruiComponents');

app.directive('ruiButton', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/button.html',
		replace: true,
		scope: {
      primary: '@',
      secondary: '@',
      caption: '@'
    }
	};
});
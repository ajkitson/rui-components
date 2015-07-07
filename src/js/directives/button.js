var app = angular.module('ruiComponents');

app.directive('ruiButton', function () {

	return {
		restrict: 'E',
		templateUrl: 'templates/button.html',
		replace: true,
    transclude: true,
    scope: {},
    link: function (scope, element, attrs) {
      // allow presence of attribute to flag as primary, etc.
      ['primary', 'secondary', 'default'].forEach(function (level) {
        if (attrs.hasOwnProperty(level)) {
          scope[level] = attrs[level] !== 'false'; // respect primary="false"
        }
      });
    }
	};
});
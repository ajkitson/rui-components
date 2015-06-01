angular.module('ruiComponents', []);
var app = angular.module('ruiComponents');

app.directive('ruiComponents', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/_all.html',
		replace: true
	};
});
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
angular.module('ruiComponents').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/_all.html',
    "<div>\n" +
    "\t<div>\n" +
    "\t\t<h2>Buttons</h2>\n" +
    "\t\t<rui-button primary=\"true\" caption=\"Primary\"></rui-button>\n" +
    "\t\t<rui-button secondary=\"true\" caption=\"Secondary\"></rui-button>\n" +
    "\t\t<rui-button caption=\"Default\"></rui-button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('templates/button.html',
    "<button \n" +
    "\tng-class=\"primary ? 'rui-btn-primary' : (secondary) ? 'rui-btn-secondary' : 'rui-btn-default'\">\n" +
    "\t{{caption}}\n" +
    "</button>"
  );

}]);

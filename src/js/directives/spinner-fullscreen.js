var app = angular.module('ruiComponents');

app.directive('ruiFullscreenSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/spinner-fullscreen.html',
    scope: {
      text: '=',
      top: '@',
      left: '@'
    }
  };
});
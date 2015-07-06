// Show/hide spinner
var app = angular.module('ruiComponents');

app.directive('ruiSpinner', function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/spinner.html'
  };

});

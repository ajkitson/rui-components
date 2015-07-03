var app = angular.module('ruiComponents');

app.directive('ruiChip', [function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/chip.html',
    scope: {
      name: '=',
      color: '=',
      onRemove: '&',
    }
  };
}]);
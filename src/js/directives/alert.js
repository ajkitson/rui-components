var app = angular.module('ruiComponents');

app.directive('ruiAlert', [function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/alert.html',
    scope: {
      message: '=', // REQUIRED
      title: '=',
      type: '=',    // 'danger' (default), 'warning', 'info', 'success'
      showContact: '=',
    }
  };
}]);
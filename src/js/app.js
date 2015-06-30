angular.module('ruiComponents', []);

angular.module('ruiComponents')
  .controller('ruiAppController', ['$scope', function($scope){
    $scope.helptextdata="data from controller";

    var counter = 0; // counter shows we're displaying most recent alert message in directive
    $scope.toggleAlert = function () {
      $scope.alert = $scope.alert
        ? null
        : { title: 'OMG', message: 'tragic alert ' + counter++ };
    };

  }]);

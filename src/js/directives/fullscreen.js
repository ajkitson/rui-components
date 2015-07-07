var app = angular.module('ruiComponents');

app.directive('ruiFullscreen', function () {

  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    templateUrl: 'templates/fullscreen.html',
    scope: {
      top: '@top',
      left: '@left'
    },
    link: function (scope, element, attrs) {
      scope.position = {
        height: 'calc(100%' + (attrs.top ? (' - ' + attrs.top) : '')  + ')',
        width: 'calc(100%' + (attrs.left ? (' - ' + attrs.left) : '') + ')',
        top: attrs.top || 0,
        left: attrs.left || 0
      };
    }
  };
});
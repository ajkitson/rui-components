var app = angular.module('ruiComponents');

app.directive('ruiChip', [function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/chip.html',
    scope: {
      name: '=',
      backgroundColor: '=color',
      onRemove: '&',
    },
    link: function (scope, element, attrs) {
      scope.style = {
        'background-color': scope.backgroundColor
      };

      // adjust text color depending on background brightness
      if (window.tinycolor) {
        var dark = 'black', light = 'white';
        var isDark = window.tinycolor(scope.backgroundColor).isDark();

        scope.style.color = isDark ? light : dark;

        // also make sure closing button (X) matches
        scope.closeStyle = {
          color: scope.style.color,
          'text-shadow': '0 1px 0 ' + (isDark ? dark : light)
        };
      }
    }
  };
}]);
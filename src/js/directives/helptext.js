var app = angular.module('ruiComponents');

app.directive('ruiHelptext', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: {
      message: '@',
      data: '='
    },
    link: function(scope, element, attrs, ctrl, linker){
      if (scope.data){
        scope.message = scope.data;
      }
      element.append('<span ng-include="\'templates/helptext.html\'"></span>');
      $compile(element.contents())(scope);
    }
	};
}]);

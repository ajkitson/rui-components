var app = angular.module('ruiComponents');

app.directive('ruiToggle', ['$compile' ,function ($compile) {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      // Wrap input in span and associate with label
      var $input = element;
      $input.wrap(angular.element('<span class="rui-toggle">'));

      var $wrapper = $input.parent(); // must save $wrapper after $input wrapped

      var $label = angular.element('<label>');
      $wrapper.append($label);

      // Update attributes
      if (attrs.type !== 'checkbox') {
        // cannot dynamically change input type so log an error
        console.error('<input> must be of type "checkbox" to use rui-toggle');
      }

      if (attrs.id) {
        $label.attr('for', attrs.id);
      } else {
        console.error('<input> must have id attribute to use rui-toggle');
      }

      // move on and off text to label
      if (attrs.onText) {
        $label.attr('data-on', attrs.onText);
        $input.removeAttr('on-text');
      }

      if (attrs.offText) {
        $label.attr('data-off', attrs.offText);
        $input.removeAttr('off-text');
      }

      // move disabled flag to span so cursor displays correctly
      if (attrs.ngDisabled) {
        $wrapper.attr('ng-disabled', attrs.ngDisabled);
      }

      $input.removeAttr('rui-toggle'); // prevent infinite recursion
      $compile($wrapper)(scope);
    }
  };
}]);
angular.module('ruiComponents', []);

angular.module('ruiComponents')
  .controller('ruiAppController', ['$scope', function($scope){

    // Help Text
    $scope.helptextdata="data from controller";

    // Alert
    var counter = 0; // counter shows we're displaying most recent alert message in directive
    $scope.toggleAlert = function () {
      $scope.alert = $scope.alert
        ? null
        : { title: 'OMG', message: 'tragic alert ' + counter++ };
    };

    // Chips
    $scope.tags = [
      { name: 'one', color: 'orange' },
      { name: 'two', color: 'rgb(0, 100, 200)' },
      { name: 'three', color: '#44FF99' }
    ];

    $scope.removeTag = function (tag, tagIx) {
      if (tagIx >= 0 && tagIx < $scope.tags.length) {
        $scope.tags.splice(tagIx, 1);
      }
      // save change to server
      // ...
    };

    var randomColor = function () {
      var rand256 = function () {
        return Math.floor(Math.random() * 256);
      };

      return 'rgb(' + [
        rand256(),
        rand256(),
        rand256()
      ].join(',') + ')';
    };

    var autoTagCnt = 0;
    $scope.addTag = function () {
      $scope.tags.push({
        name: 'autoTag' + autoTagCnt++,
        color: randomColor()
      });
    };

    // Toggle
    $scope.toggle1 = false;
    $scope.toggle2 = 'on';

    $scope.toggleCount = 0;

    $scope.incrementToggleCount = function () {
      $scope.toggleCount++;
    };

    $scope.logToggle = function () {
      console.log($scope.toggleTestForm);
    }

  }]);

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
angular.module('ruiComponents').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/_all.html',
    "<div ng-controller=\"ruiAppController\">\n" +
    "  <div>\n" +
    "    <h2>Buttons</h2>\n" +
    "    <rui-button primary=\"true\" caption=\"Primary\"></rui-button>\n" +
    "    <rui-button secondary=\"true\" caption=\"Secondary\"></rui-button>\n" +
    "    <rui-button caption=\"Default\"></rui-button>\n" +
    "  </div>\n" +
    "\t<div>\n" +
    "\t\t<h2>Help Text</h2>\n" +
    "\t\t<label rui-helptext message=\"This is the help text sample text for helping with the text of samples.\" style=\"font-size:30px;\">Chya</label>\n" +
    "    <br/>\n" +
    "\t\t<label rui-helptext data=\"helptextdata\" style=\"font-size:20px;\">Chya</label>\n" +
    "    <br>\n" +
    "    <label rui-helptext data=\"helptextdata\" style=\"font-size:40px;\">Chaa</label>\n" +
    "\t</div>\n" +
    "  <h2>Alerts</h2>\n" +
    "  <button ng-click=\"toggleAlert()\">Toggle Alert</button>\n" +
    "  <rui-alert message=\"alert.message\"></rui-alert>\n" +
    "  <div ng-repeat=\"type in ['info', 'warning', 'danger', 'success']\">\n" +
    "    <rui-alert title=\"alert.title\"\n" +
    "               message=\"alert.message\"\n" +
    "               type=\"type\"\n" +
    "               show-contact=\"true\">\n" +
    "    </rui-alert>\n" +
    "  </div>\n" +
    "  <h2>Tags</h2>\n" +
    "  <button ng-click=\"addTag()\">Add Tag</button>\n" +
    "  <div>\n" +
    "    <rui-chip ng-repeat=\"tag in tags\"\n" +
    "              name=\"tag.name\"\n" +
    "              color=\"tag.color\"\n" +
    "              on-remove=\"removeTag(tag, $index)\">\n" +
    "    </rui-chip>\n" +
    "  </div>\n" +
    "  <h2>Toggles</h2>\n" +
    "  <form name=\"toggleTestForm\" ng-submit=\"logToggle()\" novalidate>\n" +
    "    <div>\n" +
    "      <label>Disable next toggle?</label>\n" +
    "      <input rui-toggle\n" +
    "             type=\"checkbox\"\n" +
    "             id=\"toggle1\"\n" +
    "             name=\"toggle1\"\n" +
    "             ng-model=\"toggle1\"\n" +
    "             ng-change=\"incrementToggleCount()\"\n" +
    "             />\n" +
    "      Toggle1: {{toggle1}}\n" +
    "\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <label>Test toggle 2: </label>\n" +
    "      <input rui-toggle\n" +
    "             type=\"checkbox\"\n" +
    "             id=\"toggle2\"\n" +
    "             name=\"toggle2\"\n" +
    "             ng-model=\"toggle2\"\n" +
    "             on-text=\"on\"\n" +
    "             off-text=\"off\"\n" +
    "             ng-disabled=\"toggle1\"\n" +
    "             ng-true-value=\"'on'\"\n" +
    "             ng-false-value=\"'off'\"\n" +
    "             ng-change=\"incrementToggleCount()\"\n" +
    "             />\n" +
    "      Toggle2: {{toggle2}}\n" +
    "    </div>\n" +
    "    Overall count: {{toggleCount}}\n" +
    "    <input type=\"submit\" value=\"submit\"/>\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('templates/alert.html',
    "<div ng-show=\"message\" ng-class=\"'rui-alert rui-alert-' + (type || 'danger')\">\n" +
    "  <h4 ng-show=\"title\">{{ title }}</h4>\n" +
    "  <p>{{ message }}</p>\n" +
    "  <p ng-if=\"showContact\">\n" +
    "    Need more help? Let us know at <a class=\"rui-alert-link\" href=\"mailto:support@RedoxEngine.com\">support@RedoxEngine.com</a>.\n" +
    "  </p>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/button.html',
    "<button \n" +
    "\tng-class=\"primary ? 'rui-btn-primary' : (secondary) ? 'rui-btn-secondary' : 'rui-btn-default'\">\n" +
    "\t{{caption}}\n" +
    "</button>"
  );


  $templateCache.put('templates/card.html',
    ""
  );


  $templateCache.put('templates/chip.html',
    "<div class=\"rui-chip\" ng-style=\"style\">\n" +
    "  <span>{{name}}</span>\n" +
    "  <button type=\"button\" class=\"rui-close\" aria-label=\"Remove Tag\" ng-click=\"onRemove()\">\n" +
    "    <span aria-hidden=\"true\" ng-style=\"closeStyle\">&times;</span>\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/helptext.html',
    "<div class=\"rui-helptext-container\">\n" +
    "  <span class=\"rui-helptext-icon ion-help-circled\" ng-mouseover=\"showtooltip=true\" ng-mouseleave=\"showtooltip=false\" ng-click=\"clicked=!clicked\" >\n" +
    "    <span class=\"rui-tooltip\" ng-class=\"{'rui-hidden': (!(clicked || showtooltip))}\">{{message}}</span>\n" +
    "  </span>\n" +
    "  <!-- <a class=\"rui-helptext-icon ion-help-circled\"><div rui-tooltip-data='{{message}}'></div></a> -->\n" +
    "</div>\n"
  );


  $templateCache.put('templates/select.html',
    ""
  );

}]);

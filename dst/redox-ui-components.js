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
      if (tagIx !== -1) {
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
      color: '=',
      onRemove: '&',
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
    "  <button ng-click=\"toggleAlert()\">Toggle Alert</button>\n" +
    "  <rui-alert message=\"alert.message\"></rui-alert>\n" +
    "  <div ng-repeat=\"type in ['info', 'warning', 'danger', 'success']\">\n" +
    "    <rui-alert title=\"alert.title\"\n" +
    "               message=\"alert.message\"\n" +
    "               type=\"type\"\n" +
    "               show-contact=\"true\">\n" +
    "    </rui-alert>\n" +
    "  </div>\n" +
    "  <button ng-click=\"addTag()\">Add Tag</button>\n" +
    "  <div>\n" +
    "    <rui-chip ng-repeat=\"tag in tags\"\n" +
    "              name=\"tag.name\"\n" +
    "              color=\"tag.color\"\n" +
    "              on-remove=\"removeTag(tag, $index)\">\n" +
    "    </rui-chip>\n" +
    "  </div>\n" +
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
    "<div class=\"rui-chip\" ng-style=\"{'background-color':'{{color}}'}\">\n" +
    "  <span>{{name}}</span>\n" +
    "  <button type=\"button\" class=\"rui-close\" aria-label=\"Remove Tag\" ng-click=\"onRemove()\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
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

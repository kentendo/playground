var app = angular.module('kentendo.playground', 
  ['kentendo.playground.config', 
   'kentendo.playground.controllers', 
   'kentendo.playground.directives',
   'ui.ace']);
   
angular.module('kentendo.playground').config(function($locationProvider) {
  //$locationProvider.html5Mode(true);
});

angular.module('kentendo.playground').run(function($rootScope){
  // when ace editor is loaded we need to store the instance
  $rootScope.aceHtmlLoaded = function(editor){
    $rootScope.htmlEditor = editor;
    $rootScope.htmlEditor.setShowPrintMargin(false);
    $rootScope.htmlEditor.setTheme("ace/theme/idle_fingers");
    $rootScope.htmlEditor.getSession().setMode("ace/mode/html");
  };
  
   // when ace editor is loaded we need to store the instance
  $rootScope.aceCssLoaded = function(editor){
    $rootScope.cssEditor = editor;
    $rootScope.cssEditor.setShowPrintMargin(false);
    $rootScope.cssEditor.setTheme("ace/theme/idle_fingers");
    $rootScope.cssEditor.getSession().setMode("ace/mode/css");
  };
  
   // when ace editor is loaded we need to store the instance
  $rootScope.aceJsLoaded = function(editor){
    $rootScope.jsEditor = editor;
    $rootScope.jsEditor.setShowPrintMargin(false);
    $rootScope.jsEditor.setTheme("ace/theme/idle_fingers");
    $rootScope.jsEditor.getSession().setMode("ace/mode/javascript");
  };
});
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
angular.module('kentendo.playground.config', [])
.constant('PlaygroundConfig', {
  'editorTheme': 'ace/theme/eclipse',
  'playgroundUrl': '/api'
});
angular.module('kentendo.playground.controllers', []);
angular.module('kentendo.playground.controllers')
.controller('MainController', ['$scope', '$location', '$http', '$templateCache', '$compile', '$timeout', 'PlaygroundAPI', 'LertService', function($scope, $location, $http, $templateCache, $compile, $timeout, playgroundAPI, lerts) {
    
  var params = $location.search();
  $scope.playground = {
    _id: null,
    name:'',
    user:'kentendo',
    html: '',
    css: '',
    js: ''
  };

  $scope.autoRefresh = true;
  $scope.showOutput = (params.output === 'false') ? false : true;
  $scope.showHTML = (params.html === 'false') ? false : true;
  $scope.showCSS = (params.css === 'false') ? false : true;
  $scope.showJS = (params.js === 'false') ? false : true;
  $scope.showCode = true;
  $scope.toolHeight = '33.3333%';
  $scope.iframeWidth = '66.6666%';
  $scope.edited = false;
  
  $scope.$watchGroup(['showHTML', 'showCSS', 'showJS'], function(){
    $scope.toolHeight = $scope.getToolHeight();
    $scope.toolWidth = $scope.getToolWidth();
    $scope.iframeWidth = $scope.getIframeWidth();
    $scope.showCode = ($scope.getToolCount() === 0) ? false : true;
  });
    
  $scope.onHtmlChange = function(){
    $scope.playground.html = $scope.htmlEditor.getValue();
  };
  
  $scope.onCssChange = function(){
    $scope.playground.css = $scope.cssEditor.getValue();
  };
  
  $scope.onJsChange = function(){
    $scope.playground.js = $scope.jsEditor.getValue();
  };
  
  $scope.getToolCount = function(){
    return Number($scope.showHTML) + Number($scope.showCSS) + Number($scope.showJS);
  };
  
  $scope.getToolHeight = function(){
    return String(Number(100 / $scope.getToolCount()).toFixed(4)) + '%';
  };
  
  $scope.getToolWidth = function(){
    return ($scope.showOutput) ? '33.3333%' : '100%';
  };
  
  $scope.getIframeWidth = function(){
    return ($scope.getToolCount() === 0) ? '100%' : '66.6666%';
  };
    
  $scope.$watch('playground.name', function(){
    $scope.edited = true;
  });
  
  $scope.$watchGroup(['playground.html', 'playground.css', 'playground.js'], function(){    
    if($scope.autoRefresh) $scope.refresh();
    $scope.edited = true;
  });
  
  $scope.get = function(id){
    playgroundAPI.get(id)
    .success(function(data, status, headers, config){
      if(!data.success) {
        lerts.lert('error', 'Not found.');
        $location.path('/');
      }
      else {
        $scope.playground = data.data;
        $scope.htmlEditor.setValue($scope.playground.html);
        $scope.cssEditor.setValue($scope.playground.css);
        $scope.jsEditor.setValue($scope.playground.js);
        $scope.edited = false;
        lerts.lert('success', 'Loaded ' + $scope.playground.name + '.');
      }
    })
    .error(function(data, status, headers, config){
        lerts.lert('error', 'Could not connect to api.');
    });
  };
  
  // TODO
  // put in directive
  $scope.refresh = function() {
    var iframe = document.getElementById('iframe');
    iframe.srcdoc = "<!DOCTYPE html><html><head><style>"+$scope.playground.css+"</style></head><body>"+$scope.playground.html+"<script>"+$scope.playground.js+"</script></body></html>";   
  };
  
  $scope.create = function(){
    playgroundAPI.create($scope.playground)
    .success(function(data, status, headers, config){
      if(data.length === 0) $scope.new();
      else {
        lerts.lert('success', 'Created playground.');
        $scope.playground._id = data.data;
        $location.path(data.data);
      }
    })
    .error(function(data, status, headers, config){
      lerts.lert('error', 'Couldn\'t create playground.');
    });
  };
  
  $scope.update = function(){
    playgroundAPI.update($scope.playground)
    .success(function(data, status, headers, config){
      lerts.lert('success', 'Saved playground.');
      $scope.edited = false;
    })
    .error(function(data, status, headers, config){
      lerts.lert('error', 'Couldn\t save that.');
    });
  };
  
  $scope.save = function() {
    if($scope.edited === false)
    {
      lerts.lert('error', 'No changes.');
      return false;
    }
    
    if($scope.playground.html === '' && $scope.playground.css === '' && $scope.playground.js === '') {
      lerts.lert('error', 'Blank.');
      return false;
    }
    
    if($scope.playground.name === '')
      $scope.playground.name = prompt('Name playground or don\'t don\'t...');
    
    if($scope.playground._id) {
      $scope.update();
    } else {
      $scope.create();
    }
  };
  
  if($location.path()) {
    $scope.get($location.path().slice(1));
  } else {
    lerts.lert('success', 'Ready.');
  }
}]);

angular.module('kentendo.playground.directives', []);
angular.module('kentendo.playground.directives').directive('editor', function(){
  return {
    restrict: 'A',
    templateUrl: 'templates/menu.html',
    controller: function($scope){
      
      
      this.onChange = function(sequenceIndex, taskIndex){
        $scope.setSequenceTask(sequenceIndex, taskIndex);
      };
      
      
    },
    controllerAs: 'menuController'
  };
});

app.factory('PlaygroundAPI', ['$http', function($http) {
	
	var apiUrl = 'http://playground.kennycosca.com/api/';
	
	return {
		get : function(id) {
			return $http({
				method : 'get',
				url : apiUrl+id
			});
		},
		create : function(data) {
			delete data._id;
			return $http({
				method : 'post',
				url : apiUrl,
				data:data
			});
		},
		update : function(data) {
			var id = data._id;
			delete data._id;
			return $http({
				method : 'post',
				url : apiUrl+id,
				data:data
			});
		},
	};
}]); 
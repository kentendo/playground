angular.module('Playground', [function(){
	//alert('Playground Module Created');
}])
.controller('PlaygroundController', function(){
	//alert('PlaygroundController created');
	
	$scope.html = '';
	$scope.css = '';
	$scope.js = '';
	
})
.directive('PlaygroundDirective', ['$scope', function($scope){
	//alert('PlaygroundDirective created');
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'html5.html',
	};
}]);
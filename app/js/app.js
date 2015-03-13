var app = angular.module('htmlTestHarness', []);
app.controller('MainController', function($scope, $location, $http) {
	
	$scope.html = '';
	$scope.css = '';
	$scope.js = '';
	
	$scope.iframe = document.getElementById('iframe');
	$scope.autoUpdate = true;
	$scope.showHTML = true;
	$scope.showCSS = true;
	$scope.showJS = true;
	$scope.toolHeight = 33.3333;
		
	if($location.path()) $http.get('/api/get', {data:$location.path()});

	$scope.$watchGroup(['html', 'css', 'js'], function(){
		if($scope.autoUpdate) $scope.update();
	});
	
	$scope.update = function() {
		$scope.iframe.srcdoc = "<!DOCTYPE html><html><head><style>"+$scope.css+"</style></head><body>"+$scope.html+"<script>"+$scope.js+"</script></body></html>";
		// $templateRequest('templates/html5.html').then(function(resp) {
			// resp = resp.replace('{{html}}', $scope.html);
			// resp = resp.replace('{{css}}', $scope.css);
			// resp = resp.replace('{{javascript}}', $scope.javascript);
			// var iframe = document.getElementById('iframe');
			// iframe.srcdoc = resp;
		// });
	}
}); 
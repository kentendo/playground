var app = angular.module('kp', [])
app.config(function($locationProvider) {
  //$locationProvider.html5Mode(true);
})
.controller('MainController', ['$scope', '$location', '$timeout', 'PlaygroundAPI', 'LertService', function($scope, $location, $timeout, playgroundAPI, lerts) {
		
	$scope.playground = {
		_id: null,
		name:'playground',
		user:'kentendo',
		html: '',
		css: '',
		js: ''
	};
	
	$scope.tab = 4;
	
	$scope.$watch('playground', function() {
		var iframe = document.getElementById('output');
		iframe.srcdoc = "<!DOCTYPE html><html><head><style>"+$scope.playground.css+"</style></head><body>"+$scope.playground.html+"<script>"+$scope.playground.js+"</script></body></html>";
	});
	
	$scope.get = function(id){
		playgroundAPI.get(id)
		.success(function(data, status, headers, config){
			if(!data.success) {
				lerts.lert('error', 'Not found');
				$location.path('/');
			}
			else {
				console.log(data.data);
				$scope.playground = data.data;
				$timeout(function(){
					$scope.edited = false;
					prettyPrint();
				}, 0, true);
				lerts.lert('success', 'Loaded ' + $scope.playground.name);
			}
		})
		.error(function(data, status, headers, config){
		    lerts.lert('error', 'Could not connect to api');
		});
	}
	
	$scope.refresh = function() {
		var iframe = document.getElementById('iframe');
		iframe.srcdoc = "<!DOCTYPE html><html><head><style>"+$scope.playground.css+"</style></head><body>"+$scope.playground.html+"<script>"+$scope.playground.js+"</script></body></html>";
	}
	
	if($location.path()) {
		$scope.get($location.path().slice(1));
	} else {
		lerts.lert('success', 'Do dis');
	}
}]);

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
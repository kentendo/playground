app.factory('PlaygroundAPI', ['$http', function($http) {
	
	return {
		get : function(id) {
			return $http({
				method : 'get',
				url : 'http://playground.kennycosca.com:3000/api/'+id
			});
		},
		create : function(data) {
			delete data._id;
			return $http({
				method : 'post',
				url : 'http://playground.kennycosca.com:3000/api/',
				data:data
			});
		},
		update : function(data) {
			var id = data._id;
			delete data._id;
			return $http({
				method : 'post',
				url : 'http://playground.kennycosca.com:3000/api/'+id,
				data:data
			});
		},
	};
}]); 
app.factory('LertService', function($document, $compile, $rootScope){
	var z = 1111;
	return {
		lert: function(type, message){
			var html = '<lert type="'+type+'" message="'+message+'" style="z-index:'+z+'" />';
			var template = angular.element(html);
			var linkFn = $compile(template);
			var element = linkFn($rootScope.$new());
			$document.find('body').append(element);
			z++;
		}
	};
})
app.directive("lert", function($timeout){
	return {
		restrict:'E',
		replace:true,
		templateUrl:'templates/lert.html',
		link: function(scope, element, attributes){
			var timeout = $timeout(function(){
				element.remove();
			}, 5000);
			
			element.on('click', function(e){
				$timeout.cancel(timeout);
				element.remove();
			});
        },
        scope:{
        	type:"@type",
        	message:"@message"
        }
	};
});

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

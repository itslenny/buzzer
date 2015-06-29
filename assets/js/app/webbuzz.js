var webbuzz = angular.module('webbuzz',[]);

webbuzz.controller('buzzform',['$scope','$http',function($scope,$http){

  $scope.user = window.localStorage.user || "";

  $scope.score=5;

  $scope.doBuzz = function(){
    if(!$scope.user || $scope.user.length < 3){
      alert('You must enter your name. It must be atleast 2 characters')
      return;
    }
    $http.get('/api/buzz/do/WDI-SEA-03/' + $scope.user + '/' + $scope.score)
    .success(function(data){
      alert(data);
    });
  }

  $scope.$watch('user',function(){
    window.localStorage.user = $scope.user;
  });

}]);
buzzerApp.controller('LoginCtrl',['$scope','$location','UserService',function($scope,$location,UserService){
    $scope.user={email:'',password:''};

    $scope.login = function(){
        UserService.login($scope.user,function(err,data){
            if(err){
                alert(err.error || 'Unknown Error!! See console');
                console.log('Login Error',err);
            }else{
                $location.path('/room');
            }
        });
    };

}]);
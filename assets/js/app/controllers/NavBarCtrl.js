buzzerApp.controller('NavBarCtrl',['$scope','$modal','$location','UserService',function($scope,$modal,$location,UserService){

    $scope.userService = UserService;
    $scope.user=false;

    $scope.$watchCollection('userService',function(){
        $scope.user=UserService.currentUser || false;
    });
    

    $scope.logout=function(){
        UserService.logout(function(){
            $location.path('/login');
        });
    };

    $scope.createUser=function(){
        $modal.open({
            controller:'AddUserModalCtrl',
            templateUrl:'/views/addUserModal.html'
        }).result.then(function(result){
            if(result){
                UserService.create(result,function(err,data){
                    if(!err && data){
                        alert('user created');
                    }else{
                        alert('Could not create user -- see console');
                        console.log('err',err);
                        console.log('data',data);
                    }
                });
            }else{
                alert('invalid user data');
            }
        },function(reason){

        });
    }

}]);

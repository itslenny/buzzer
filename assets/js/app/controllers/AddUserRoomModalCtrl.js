buzzerApp.controller('AddUserRoomModalCtrl',['$scope','$modalInstance','$http',function($scope,$modalInstance,$http){

    $scope.users={};

    $http.get('/api/user').success(function(users){
        $scope.users=users;
    })

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
        if($scope.user){
            $modalInstance.close($scope.user);
        }else{
            alert('please select a user');
        }
        
    };    
}]);


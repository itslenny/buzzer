buzzerApp.controller('RoomIndexCtrl',['$scope','$modal','$location','$http','UserService',function($scope,$modal,$location,$http,UserService){

    $scope.rooms=[];

    var uid = UserService.currentUser.id;

    $http.get('/api/user/'+uid+'/rooms')
    .success(function(data){
        $scope.rooms=data || [];
    })
    .error(function(err){
        alert('Error see console');
        console.log(err);
    });

    $scope.addRoom=function(){
        $modal.open({
            controller:'AddRoomModalCtrl',
            templateUrl:'/views/addRoomModal.html'
        }).result.then(function(roomInfo){
            $http.post('/api/user/'+uid+'/rooms',roomInfo).success(function(data){
                if(data){
                    $scope.rooms=data.rooms;
                }
            }).error(function(err){
                alert('error see console');
                console.log(err);
            });
        },function(reason){

        })
    }

    

    $scope.addUser=function(idx){
        $modal.open({
            controller:'AddUserRoomModalCtrl',
            templateUrl:'/views/AddUserRoom.html'
        }).result.then(function(user){
            $http.post('/api/user/'+user.id+'/rooms/add/'+$scope.rooms[idx].id).success(function(data){
                if(data){
                    alert('User added to room.');
                }
            }).error(function(err){
                alert('error see console');
                console.log(err);
            });
        },function(reason){

        })
    }    

}]);
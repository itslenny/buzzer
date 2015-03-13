buzzerApp.controller('RoomIndexCtrl',['$scope','$location','$http','UserService',function($scope,$location,$http,UserService){

    $scope.rooms=[];

    var uid = UserService.currentUser.id;

    $http.get('/api/user/'+uid+'/rooms')
    .success(function(data){
        $scope.rooms=data || [];
    })
    .error(function(err){
        alert('ERROR');
        console.log(err);
    })

}]);
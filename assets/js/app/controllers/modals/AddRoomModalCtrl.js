buzzerApp.controller('AddRoomModalCtrl',['$scope','$modalInstance',function($scope,$modalInstance){

    $scope.roomInfo={};

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
        $modalInstance.close($scope.roomInfo);
    };    
}]);


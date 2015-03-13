buzzerApp.controller('AddUserModalCtrl',['$scope','$modalInstance',function($scope,$modalInstance){

    $scope.user={};

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
        $modalInstance.close($scope.user);
    };    
}]);


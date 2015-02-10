var roomApp = angular.module('RoomApp',['chart.js']);

roomApp.controller('RoomCtrl',['$scope',function($scope){
    var buzzes=[];
    $scope.room = window.ROOM_DATA;
    $scope.test="Lenny";
    $scope.roomSize=$scope.room.size;

    $scope.resetRoom = function(){
        io.socket.get('/buzz/reset/'+$scope.room.id,function(){
                //location.reload();
                initCharts();
            })
    }

    $scope.$watch('roomSize',function(){
        var roomSize = parseInt($scope.roomSize);
        if(roomSize != $scope.roomSize || ($scope.fData && roomSize < $scope.fData[1])){
            $scope.invalidSize=true;
            return;
        } 
        $scope.invalidSize=false;
        if($scope.fData) updatePending();
        io.socket.put('/room/'+$scope.room.id,{size:roomSize},function(data,jwrs){
            //do nothing.
        });
    });

    io.socket.on('newbuzz',function(newBuzz){
        buzzes.push(newBuzz);
        updateCharts();
    })  

    io.socket.get('/room/watch/'+$scope.room.id,function(data,jwrs){
        buzzes=data;
        initCharts();
        updateCharts();
    });

    function initCharts(){
        $scope.$apply(function(){
            $scope.uData = [0,0,0,0,0];
            $scope.uLabels=['1','2','3','4','5'];
            $scope.fData = [$scope.roomSize,0];
            $scope.fLabels=['Pending','Finished'];        
        });
    }

    function updatePending(){
        $scope.fData[0] = $scope.roomSize - $scope.fData[1];
    }

    function updateCharts(){
        $scope.$apply(function(){
            buzzes.forEach(function(item){
                var barTitle=''+(item.number||'0');
                var existingBar = $scope.uLabels.indexOf(barTitle);
                if(existingBar != -1){
                    $scope.uData[existingBar]+=1;
                    // }else{
                    //     $scope.uLabels.push(barTitle);
                    //     $scope.uData.push(1);
                }

                if($scope.fData[1] < $scope.roomSize){
                    $scope.fData[1]+=1;
                }
            });
            updatePending();
            buzzes=[];
        });
    }
}]);
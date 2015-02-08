var roomApp = angular.module('RoomApp',['chart.js']);

roomApp.controller('RoomCtrl',['$scope',function($scope){
    var buzzes=[];
    $scope.roomid = window.ROOM_ID;
    $scope.test="Lenny";
    $scope.roomSize=17;

    $scope.resetRoom = function(){
        io.socket.get('/buzz/reset/'+window.ROOM_ID,function(){
                //location.reload();
                initCharts();
            })
    }

    io.socket.on('buzz',function(event){
        if(event.data && event.data.room && event.data.room==window.ROOM_ID){
            buzzes.push(event.data);
            updateCharts();
        }

    })  


    io.socket.get('/buzz?status=new&room='+window.ROOM_ID,function(data,jwrs){
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

                if($scope.fData[0] > 0){
                    $scope.fData[0]-=1;
                    $scope.fData[1]+=1;
                }
            });
            buzzes=[];
        });
    }
}]);
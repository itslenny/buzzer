buzzerApp.controller('RoomShowCtrl',['$scope','$location','$routeParams','UserService',function($scope,$location,$routeParams,UserService){

    var roomId = $routeParams.id;
    $scope.room = {};
    $scope.fColors=['#888888','#00CC00'];
    $scope.uColors=['#FF0000','#EE8800','#EEEE00','#0088AA','#00BB00'];

    $scope.resetRoom = function(){
        io.socket.get('/api/buzz/reset/'+roomId,function(){
            $scope.$evalAsync(function(){
                initCharts();
            });
        })
    }

    io.socket.on('newbuzz',function(newBuzz){
        $scope.$evalAsync(function(){
            $scope.room.buzzes.push(newBuzz);
            updateCharts();
        });
    })  

    io.socket.get('/api/room/watch/'+roomId,function(data,jwrs){
        if(data.error){
            alert(data.error);
            $location.path('/room');
        }else{
            $scope.$evalAsync(function(){
                $scope.room=data;
                initCharts();
                updateCharts();
                addSizeWatcher();  
            });         
        }
    });

    function initCharts(){
        if(!$scope.room.buzzes) $scope.room.buzzes = [];
        $scope.uData = [0,0,0,0,0];
        $scope.uLabels=['1','2','3','4','5'];
        $scope.fData = [$scope.room.size,0];
        $scope.fLabels=['Pending','Finished'];        
    }

    function updatePending(){
        $scope.fData[0] = $scope.room.size - $scope.fData[1];
    }

    function updateCharts(){
        $scope.room.buzzes.forEach(function(item){
            var barTitle=''+(item.number||'0');
            var existingBar = $scope.uLabels.indexOf(barTitle);
            if(existingBar != -1){
                $scope.uData[existingBar]+=1;
            }

            if($scope.fData[1] < $scope.room.size){
                $scope.fData[1]+=1;
            }
        });
        updatePending();
        $scope.room.buzzes=[];
    }

    function addSizeWatcher(){
        $scope.$watch('room.size',function(){
            var roomSize = parseInt($scope.room.size);
            if(roomSize != $scope.room.size || ($scope.fData && roomSize < $scope.fData[1])){
                $scope.invalidSize=true;
                return;
            } 
            $scope.invalidSize=false;
            if($scope.fData) updatePending();
            io.socket.put('/api/room/'+roomId,{size:roomSize},function(data,jwrs){
                //do nothing.
            });
        });        
    }

}]);
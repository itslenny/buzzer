var buzzerApp = angular.module('buzzerApp',['chart.js','ui.bootstrap','ngRoute']);

buzzerApp.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider
        .when('/',{
            template:'Loading...'
        })        
        .when('/login', {
            controller:'LoginCtrl',
            templateUrl:'/views/login.html'
        })
        .when('/room', {
            controller:'RoomIndexCtrl',
            templateUrl:'/views/roomIndex.html'
        })
        .when('/room/:id', {
            controller:'RoomShowCtrl',
            templateUrl:'/views/roomShow.html'
        })
        .otherwise({redirectTo: '/Error_404'});
}]);

buzzerApp.run(['UserService','$location',function(UserService,$location){

    //check auth at start
    UserService.check(function(err,data){
        switch($location.path()){
            case '/':
            case '/login':
                if(UserService.currentUser){
                    $location.path('/room')
                }else{
                    $location.path('/login')
                }
                break;
            default:
                UserService.restrictAccess();
        }
    });
}]);;
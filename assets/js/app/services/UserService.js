buzzerApp.factory('UserService',['$http','$location',function($http,$location){

    return {
        create:function(userData,callback){
            var self=this;
            $http.post('/api/user',userData)
            .success(function(data){
                callback(null,data);
            }).error(function(err){
                callback(err);
            });
        },
        update:function(userData,callback){
            var self=this;
            if(!self.currentUser) return callback({error:'User not logged in'});
            $http.put('/api/user/'+self.currentUser.id,userData)
            .success(function(data){
                callback(null,data);
            }).error(function(err){
                callback(err);
            });
        },
        login: function(loginData,callback){
            var self = this;
            $http.post('/api/auth',loginData)
            .success(function(data){
                if(data && data.user){
                    self.currentUser=data.user;
                    callback(null,data);
                }else{
                    self.currentUser=false;
                    callback(data);
                }

            }).error(function(err){
                callback(err);
            });
        },
        logout: function(callback){
            var self=this;
            $http.delete('/api/auth')
            .success(function(data){
                self.currentUser=false;
                callback(null,data);
            }).error(function(err){
                callback(err);
            });
        },
        check: function(callback){
            var self=this;
            $http.get('/api/auth')
            .success(function(data){
                if(data && data.user){
                    self.currentUser=data.user;
                }else{
                    self.currentUser=false;
                }
                callback(null,data);
            }).error(function(err){
                callback(err);
            });
        },
        restrictAccess:function(){
            if(!this.currentUser) $location.path('/login');
        }
    }
}])
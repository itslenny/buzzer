/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt=require('bcrypt');

module.exports = {
    showLogin:function(req,res){
        res.view('login');
    },
	login:function(req,res){
        User.findOne({email:req.body.email}).then(function(user){
            if(user){
                bcrypt.compare(req.body.password,user.password,function(err,match){
                    if(match){
                        req.session.user=user;
                        res.send({
                            result:true,
                            user:user
                        });                        
                    }else{
                        res.send({
                            result:false,
                            error:"Invalid password."
                        });
                    }
                    
                });
            }else{
                res.send({
                    result:false,
                    error:"Unknown e-mail address."
                });
            }
        })
    },
    check:function(req,res){
        res.send({
            user:req.session.user||false
        });
    },
    logout:function(req,res){
        delete req.session.user;
        res.send({result:true});
    }
};


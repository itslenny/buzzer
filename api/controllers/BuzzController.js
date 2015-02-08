/**
 * BuzzController
 *
 * @description :: Server-side logic for managing buzzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    do:function(req,res){
        if(!req.params.room || !req.params.who){
            return res.send("INVALID BUZZ");
        }
        var number = parseInt(req.params.num || 5);
        if(number < 1 || number > 5){
            return res.send("INVALID BUZZ. Enter a number between 1 and 5.");
        }
        var data = {room:req.params.room,who:req.params.who,status:'new'};
        Buzz.count(data).exec(function(err,count){
            if(count > 0){
                res.send("NOPE! You already buzzed in.");
            }else{
                data.number = number;
                Buzz.create(data).exec(function(err,buzz){
                    Buzz.publishCreate(buzz);

                    res.send("You are buzzed in.");
                });
            }
        });


    },
    reset:function(req,res){
        Buzz.update({room:req.params.room},{status:'archived'}).exec(function(){
            res.send("Room "+req.params.room+" reset.");
        });
    }

};


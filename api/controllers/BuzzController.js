/**
 * BuzzController
 *
 * @description :: Server-side logic for managing buzzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    do:function(req,res){
        if(!req.params.room || !req.params.who){
            return res.send("INVALID BUZZ. Missing data.");
        }
        var number = parseInt(req.params.num || 5);
        if(number < 1 || number > 5){
            return res.send("INVALID BUZZ. Enter a number between 1 and 5.");
        }

        Room.findOne({name:req.params.room})
        .populate('buzzes',{where:{status:'new',who:req.params.who}})
        .exec(function(err,room){
            if(!room) return res.send("INVALID ROOM.");
            if(room.buzzes && room.buzzes.length > 0) return res.send("NOPE! You already buzzed in.");
            var buzzData={room:room.id,who:req.params.who,number:number}
            Buzz.create(buzzData).exec(function(err,newBuzz){
                if(err) return res.send(err);
                sails.sockets.broadcast(room.id,'newbuzz',newBuzz);
                res.send("You are buzzed in.");

                // Buzz.publishCreate(buzz);
                //room.buzzes.publishAdd()
            });
        });
    },
    reset:function(req,res){
        Buzz.update({room:req.params.roomid},{status:'archived'}).exec(function(){
            res.send("Room "+req.params.room+" reset.");
        });
    }

};


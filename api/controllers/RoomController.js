/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index:function(req,res){
        res.send('nah.. no list')
    },
    show:function(req,res){
        if(!req.params.room) return res.send('Invalid room');
        Buzz.find({room:req.params.room,status:'new'}).exec(function(err,data){
            res.view('room/show',{buzzes:data,roomId:req.params.room});
        });
    }
};


/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index:function(req,res){
        res.send('nah... no list')
    },
    live:function(req,res){
        if(!req.params.roomid) return res.send('Invalid room');
        Room.findOne(req.params.roomid).exec(function(err,room){
            if(!room) return res.send('Invalid room.');
            res.view('room/live',{roomData:JSON.stringify(room)});
        });
    },
    watch:function(req,res){
        Room.findOne(req.params.roomid)
        .populate('buzzes',{where:{status:'new'}})
        .exec(function(err,room){
            if(room){
                sails.sockets.join(req.socket, room.id);
                res.send(room);
            }else{
                res.send(404,{error:'Room not found.'});
            }
        });
    },
    mine:function(req,res){
        User.findOne(req.session.user.id)
        .populate('rooms')
        .exec(function(err,user){
            res.view('room/mine',{rooms:user.rooms});
        });
    }
};


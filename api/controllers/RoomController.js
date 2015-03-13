/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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
    }
};


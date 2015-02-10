/**
* Room.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{
        type:'string',
        unique:true,
        required:true
    },
    size:{
        type:'integer',
        required:true
    },

    ////// associations /////

    buzzes:{
        collection:'Buzz',
        via:'room'
    },

    users:{
        collection:'User',
        via:'rooms'
    }
  }
};


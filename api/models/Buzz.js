/**
* Buzz.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    number:{
        type:"integer"
    },
    user:{
        type:"string",
        index:true
    },
    status:{
        type:"string",
        defaultsTo:'new',
        enum:['archived','new']
    },

    ////// associations /////

    room:{
        model:'Room'
    }

  }

};


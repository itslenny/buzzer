var pkg = require('../../package.json');

module.exports = {
    // GET / -- root route
    index:function(req,res){
        res.view('index.ejs',{version:pkg.version})
    },
    buzzer:function(req,res){
      res.view('web-buzz.ejs');
    }
}
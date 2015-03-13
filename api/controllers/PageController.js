module.exports = {

    // GET / -- root route 
    index:function(req,res){
        res.view('index.ejs')
    }
}
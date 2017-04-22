const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Url = require('../models/url');


router.get('/:url',(req,res,next)=>{
    let newurl = new Url({
        url:req.params.url,
        uniqueId:uniqueid()
    });
    Url.addUrl(newurl,(err,data)=>{
        if(err){
            res.json({success:false,msg:'unable to add url'});
        } else{
            res.json({url: 'myurlshorti.herokuapp.com/api/url/'+newurl.uniqueId});
        }
    });
});

router.get('/url/:uniqueid',(req,res,next) => {
    var uniqueid = req.params.uniqueid;
    Url.findUrl(uniqueid,(err,urlid)=>{
        if (err) throw err;
        if(!urlid){
            return res.json({success:false,msg:'url not found!!'});
        }else{
            res.redirect("https://"+urlid.url);
        }

    });
});


function uniqueid(){
    return  Math.floor(Math.random() * (50000 - 30)) + 50000;
}
module.exports = router;
const mongoose = require('mongoose');
const config = require('../config/database');

const UrlSchema = mongoose.Schema({
    url:{
        type:String
    },
    uniqueId:{
        type:String
    }
});

const url = module.exports = mongoose.model('urls',UrlSchema);


module.exports.addUrl = function(newurl,callback){
    newurl.save(callback);
};

module.exports.findUrl = function(uniqueid,callback){
    const query = {uniqueId:uniqueid};
    url.findOne(query,callback);
}
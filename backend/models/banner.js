const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bannerSchema = new Schema({
    name: String,
    order: Number,
    link: String,
    status: Boolean,
    bannerImg: String,
    bannerImgFilename:String,

    bannerMobImg: String,
    bannerMobImgFilename:String,
  },{
      timestamps:true
  }); 

  let banner = conn.model('banner',bannerSchema)

module.exports = banner;
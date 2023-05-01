const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mediaSchema = new Schema({
    title: String,
    discription: String,
    link: String,
    date: String,
    owner: String,
  },{
      timestamps:true
  }); 

  let media = conn.model('media',mediaSchema)

module.exports = media;
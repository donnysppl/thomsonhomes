const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pageSchema = new Schema({
    name: String,
    slug: String,
    metatitle: String,
    metadesciption: String,
    metakeyword: String,
    bodydata: String,
  },{
      timestamps:true
  }); 

  let pages = conn.model('pages',pageSchema)

module.exports = pages;
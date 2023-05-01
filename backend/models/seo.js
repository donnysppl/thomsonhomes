const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const seoSchema = new Schema({
    name: String,
    slug: String,
    metatitle: String,
    metadesciption: String,
    metakeyword: String,
  },{
      timestamps:true
  }); 

  let seo = conn.model('seo',seoSchema)

module.exports = seo;
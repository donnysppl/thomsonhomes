const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const brandstoreSchema = new Schema({
    name: String,
    slug: {
      type : String,
      required: true,
      unique: true,
    },
    brandstoredata: Array,
  },{
      timestamps:true
  }); 

  let brandstore = conn.model('brandstore',brandstoreSchema)

module.exports = brandstore;
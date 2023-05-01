const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
    name: String,
    email: String,
    number: String,
    message: String,
  },{
      timestamps:true
  }); 

let contact = conn.model('contact',contactSchema);

const contactFrontSchema = new Schema({
  pagecontent: String,
  metatitle: String,
  metadiscrip: String,
  metakeyword: String,
},{
    timestamps:true
}); 

let contactfront = conn.model('contactfront',contactFrontSchema)

module.exports = {contact,contactfront};
const mongoose = require("mongoose");
const conn = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  name: String,
  slug: String,
  order: Number,
  link: String,
  cateimg: String,
  metatitle: String,
  metadescription: String,
  metakeywords: String,
  cateimgfilename: String,
  parentcate: Boolean,
  childcate: String,
}, {
  timestamps: true
});

let category = conn.model('category', categorySchema);

const productSchema = new Schema({
  name: String,
  slug: String,
  metatitle: String,
  metadiscrip: String,
  metakeyword: String,
  category: String,
  categoryslug: String,
  parentcategory: String,
  model: String,
  shortdiscrip: String,
  buylink: String,
  discription: String,
  mainproductimg: String,
  // productimg : Array,
  // productrpd : Array,
  productimg: [{
    productimgurl: String,
    productimgfilename: String,
  }],
  productrpd: [],
  mainproductimgfilename: String,
}, {
  timestamps: true
});

let product = conn.model('product', productSchema)

module.exports = { category, product };
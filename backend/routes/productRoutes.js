const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const Product = require("../models/product");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = path.join(__dirname, '../public/image/category')
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                cb(null, dir);

            } else {
                cb(null, dir);
            }
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}--${file.originalname}`);
        }
    })
});

const uploadprod = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = path.join(__dirname, `../public/image/product/${req.params.id}`)
            let data = Product.product.findById(req.params.id);
            if(data){
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    cb(null, dir);
                } else {
                    cb(null, dir);
                }
            }
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}--${file.originalname}`);
        }
    })
});

router.get("/", (req, res) => {
    res.send("Hello Product ");
})

// product/category
router.post("/category/add", upload.single("cateimg") ,productCtrl.categoryAdd);
router.put("/category/edit/:id", upload.single("cateimg") ,productCtrl.categoryEdit);
router.get("/category/list",productCtrl.categoryList);
router.get("/category/list/:id",productCtrl.categoryListperId);
router.delete("/category/delete/:id",productCtrl.categoryDelete);

// product
router.post("/add",productCtrl.productAdd);
router.get("/list",productCtrl.productList);
router.get("/list/:category",productCtrl.productlistbyCate);
router.get("/listdata/:id",productCtrl.productlistbyID);
router.delete("/delete/:id",productCtrl.productDelete);
router.delete("/deleteimg/:productid/:productimgid",productCtrl.prodImgDelete);
router.put("/edit/:id", productCtrl.productEdit);
router.put("/edit/img/:id",uploadprod.fields([ 
    {name : 'mainproductimg', maxCount: 1 },
    {name: 'productimg', maxCount: 10 }
]), productCtrl.prodImgEdit);

// product image
router.post("/image/add/:id", uploadprod.fields([ 
    {name : 'mainproductimg', maxCount: 1 },
    {name: 'productimg', maxCount: 10 },
    {name: 'productrpd', maxCount:15}
]),productCtrl.productImgAdd);

module.exports = router;
const express = require("express");
const router = express.Router();
const bannerCtrl = require("../controllers/bannerController");
var jwt = require('jsonwebtoken');
const multer = require("multer");
const fs = require('fs');
var passport = require('passport');
require('../config/passport')(passport);

const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = path.join(__dirname, '../public/image/banner')
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

router.get("/", (req, res) => {
    res.send("Hello banner ");
})

router.post("/add", upload.fields([ 
    {name : 'bannerImg', maxCount: 1 },
    {name: 'bannerMobImg', maxCount: 1 }
]), bannerCtrl.bannerAdd);

router.put("/edit/:id", upload.fields([ 
    {name : 'bannerImg', maxCount: 1 },
    {name: 'bannerMobImg', maxCount: 1 }
]), bannerCtrl.bannerEdit);

router.delete("/delete/:id", bannerCtrl.bannerDelete);
router.get("/list", bannerCtrl.bannerList);
router.get("/list/:id", bannerCtrl.bannerListid);

module.exports = router;
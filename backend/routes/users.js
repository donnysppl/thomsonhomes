const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
var jwt = require('jsonwebtoken');

var passport = require('passport');
require('../config/passport')(passport);


router.get("/",(req,res)=>{
    res.send("Hello Devs ");
})

router.get("/list",passport.authenticate('jwt',{session:false}),userCtrl.userList);

router.post("/add",userCtrl.userAdd);

router.post("/login",userCtrl.userLogin);


module.exports = router;
const express = require("express");
const router = express.Router();
const BSctrl = require("../controllers/brandStoreCtrl");
var jwt = require('jsonwebtoken');

router.get("/",(req,res)=>{
    res.send("Hello Brand Store ");
})

router.post("/add", BSctrl.brandStoreAdd);
router.get("/list", BSctrl.bsList);
router.get("/list/:id", BSctrl.bsListID);
router.get("/listslug/:slug", BSctrl.bsDataSlug);
router.delete("/delete/:id", BSctrl.bsDelete);
router.put("/edit/:id", BSctrl.bsEdit);

module.exports = router;
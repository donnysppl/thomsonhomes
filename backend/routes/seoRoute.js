const express = require("express");
const router = express.Router();
const SeoController = require("../controllers/seoController");

router.get("/", (req, res) => {
    res.send("Hello Seo ");
})

router.post("/add",SeoController.seoAdd);
router.get("/list",SeoController.seoList);
router.get("/list/:id",SeoController.seoListperid);
router.get("/list/:slug",SeoController.seoListperslug);
router.delete("/delete/:id",SeoController.seoDelete);
router.put("/edit/:id",SeoController.seoEdit);

module.exports = router;
const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", (req, res) => {
    res.send("Hello Pages ");
})

router.post("/add", pagesController.pagesAdd);
router.get("/list", pagesController.pagesList);
router.get("/list/:id", pagesController.pagesListperid);
router.get("/listdata/:slug", pagesController.pagesListperslug);
router.delete("/delete/:id", pagesController.pagesDelete);
router.put("/edit/:id", pagesController.pageEdit );

module.exports = router;
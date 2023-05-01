const express = require("express");
const router = express.Router();
const mediaCTRL = require("../controllers/mediaController");

router.get("/", (req, res) => {
    res.send("Hello Media");
})

router.post("/add",mediaCTRL.mediaAdd);
router.get("/list",mediaCTRL.mediaList);
router.get("/list/:id",mediaCTRL.mediaListId);
router.delete("/delete/:id",mediaCTRL.mediaDelete);
router.put("/edit/:id",mediaCTRL.mediaEdit);

module.exports = router;
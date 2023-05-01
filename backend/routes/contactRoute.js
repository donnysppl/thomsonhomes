const express = require("express");
const router = express.Router();
const contactCTRL = require("../controllers/contactController");

router.get("/", (req, res) => {
    res.send("Hello contact ");
})

router.post("/add",contactCTRL.contactAdd);
router.get("/list",contactCTRL.contactList);

router.post("/addfront",contactCTRL.contactFrontAdd);
router.put("/editfront/:id",contactCTRL.contactFrontEdit);
router.get("/datafront/:id",contactCTRL.contactFrontList);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get('/', (req, res) => {
    res.send("masuk")
});
router.post("/pertama", controller.tes1);
router.post("/kedua", controller.tes2);

module.exports = router;

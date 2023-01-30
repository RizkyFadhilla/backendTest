const express = require("express");
const Controller = require("../controller/controller");
const Authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", Controller.login);
router.use(Authentication);
router.get("/", (req, res) => {
  res.send("masuk");
});
router.post("/company", Controller.createCompany);
router.post("/barang", Controller.createBarang);
router.get("/transaction", Controller.readAllTransaction);
router.post("/transaction", Controller.createTransaction);

// router.post("/kedua", controller.tes2);

module.exports = router;

const express = require("express");
const router = express.Router();
const transaction = require("../controllers/sale");
const auth = require("../middleware/user");

router.get("/", auth, transaction.getSale);

router.post("/add", auth, transaction.saveSale);

// router.post("/edit", auth, transaction.editTransaction);

router.post("/delete", auth, transaction.deleteSale);

module.exports = router;

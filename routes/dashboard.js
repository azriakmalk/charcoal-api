const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const auth = require("../middleware/user");

router.get("/", dashboard.getDashboard);

// router.post('/add',auth,level.saveLevel);

// router.post('/edit',auth,level.editLevel);

// router.post('/delete',auth,level.deleteLevel);

module.exports = router;

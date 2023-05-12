const express = require("express");

const router = express.Router();

const path = require("path");

const adminPage = require("../controllers/Dashbroad");

router.get("/admin", adminPage.getDashbroad);

module.exports = router;

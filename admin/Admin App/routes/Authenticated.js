const express = require("express");

const router = express.Router();

const path = require("path");

const loginPage = require("../controllers/Authenticated");

router.get("/", loginPage.getLogin);

router.post("/", loginPage.postLogin);

module.exports = router;

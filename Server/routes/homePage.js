const path = require("path");

const express = require("express");

const router = express.Router();

const homepageControl = require("../controllers/getHomePage");

const AuthenticateControl = require("../controllers/AuthenticateForm");

router.get("/", homepageControl.getCountHotel);

router.post("/", homepageControl.postHotel);

router.get("/", homepageControl.getGenreHotel);

router.get("/", homepageControl.getRatingHotel);

router.post("/signup", AuthenticateControl.postNewUser);

// router.get("/signup", AuthenticateControl.getNewUser);

router.get("/signin", AuthenticateControl.getNewUser);

router.post(
  "/signin",
  AuthenticateControl.postValidUser,
  AuthenticateControl.getValidUser
);

module.exports = router;

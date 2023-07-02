const path = require("path");

const express = require("express");

const router = express.Router();

const homepageControl = require("../controllers/getHomePage");

const AuthenticateControl = require("../controllers/AuthenticateForm");

// router.get("/", homepageControl.getCountHotel);

router.post("/", homepageControl.postHotel);

router.get("/counthotel", homepageControl.getCountHotel);

router.get("/ratinghighest", homepageControl.getRatingHotel);

router.post("/serchhotels", homepageControl.serchHotels);

// router.get("/signup", AuthenticateControl.getNewUser);

// router.get("/signin", AuthenticateControl.getNewUser);

router.post("/signup", AuthenticateControl.postNewUser);

router.post("/signin", AuthenticateControl.postValidUser);

module.exports = router;

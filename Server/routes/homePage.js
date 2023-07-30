const path = require("path");

const express = require("express");

const router = express.Router();

const homepageControl = require("../controllers/getHomePage");

const AuthenticateControl = require("../controllers/AuthenticateForm");

// router.get("/", homepageControl.getCountHotel);

router.post("/", homepageControl.postHotel);

router.get("/counthotel", homepageControl.getCountHotel);

router.get("/ratinghighest", homepageControl.getRatingHotel);

// Search page
router.post("/searchhotels", homepageControl.serchHotels);

// detail page
router.post("/detailhotel", homepageControl.detailHotel); // add paramter

router.post("/detailhotel/reserve", homepageControl.reserveDetailHotel);
// router.get("/signin", AuthenticateControl.getNewUser);
router.get("/transaction", homepageControl.transactionHotel);

// Authentication
router.post("/signup", AuthenticateControl.postNewUser);

router.post("/signin", AuthenticateControl.postValidUser);

module.exports = router;

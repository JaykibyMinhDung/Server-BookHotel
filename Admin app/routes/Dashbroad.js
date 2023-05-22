const express = require("express");

const router = express.Router();

const path = require("path");

const adminPage = require("../controllers/Dashbroad");

router.get("/admin", adminPage.getDashbroad);

router.get("/hotellist", adminPage.gethotelList);

router.get("/hotellist/newhotel", adminPage.getAddnewHotel);

router.get("/roomlist", adminPage.getroomsList);

router.get("/hotellist/newroom", adminPage.getaddnewRooms);

router.get("/transactionlist", adminPage.gettransactionList);

module.exports = router;

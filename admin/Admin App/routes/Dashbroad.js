const express = require("express");

const router = express.Router();

const path = require("path");

const adminPage = require("../controllers/Dashbroad");

const isAuth = require("../middleware/isAuth");

router.get("/admin", isAuth, adminPage.getDashbroad);

router.get("/hotellist", isAuth, adminPage.gethotelList);

router.get("/hotellist/newhotel", isAuth, adminPage.getAddnewHotel);

router.get("/roomlist", isAuth, adminPage.getroomsList);

router.get("/hotellist/newroom", isAuth, adminPage.getaddnewRooms);

router.get("/transactionlist", isAuth, adminPage.gettransactionList);

module.exports = router;

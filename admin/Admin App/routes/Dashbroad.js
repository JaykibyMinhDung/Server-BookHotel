const express = require("express");
const { query, body } = require("express-validator");
const router = express.Router();

const path = require("path");

const adminPage = require("../controllers/Dashbroad");

const isAuth = require("../middleware/isAuth");

router.get("/admin", isAuth, adminPage.getDashbroad);
router.get("/transactionlist", isAuth, adminPage.gettransactionList);

//* Hotel route *//
router.get("/hotellist", isAuth, adminPage.gethotelList);

router.get("/hotellist/newhotel", isAuth, adminPage.getAddnewHotel);

router.post(
  "/hotellist/newhotel",
  [
    body("Address").notEmpty().trim(),
    body("City").notEmpty().trim(),
    body("Description").notEmpty().trim(),
    body("Price").notEmpty().trim().isFloat(),
    body("far").notEmpty().trim(),
    body("Feature").notEmpty().trim(),
    body("Name").notEmpty().trim(),
    body("Images"),
    body("Rooms").notEmpty().trim(),
    body("Title").notEmpty().trim().isString(),
    body("Type").notEmpty().trim(),
  ],
  isAuth,
  adminPage.postNewHotelList
);

router.post("/hotellist/deleted/:id", isAuth, adminPage.deleteHotelList);

router.get("/hotellist/:id", isAuth, adminPage.getAddnewHotel);

router.post(
  "/hotellist/updated/:id",
  [
    body("Address").notEmpty().trim(),
    body("City").notEmpty().trim(),
    body("Description").notEmpty().trim(),
    body("Price").notEmpty().trim().isFloat(),
    body("far").notEmpty().trim(),
    body("Feature").notEmpty().trim(),
    body("Name").notEmpty().trim(),
    body("Rooms").notEmpty().trim(),
    body("Title").notEmpty().trim().isString(),
    body("Type").notEmpty().trim(),
  ],
  isAuth,
  adminPage.postNewHotelList
);

//* Room route *//
router.get("/roomlist", isAuth, adminPage.getroomsList);

router.get("/roomlist/newroom", isAuth, adminPage.getaddnewRooms);

router.post("/roomlist/deleted/:id", isAuth, adminPage.deleteRoomList);

router.post(
  "/room-list/new-room",
  [
    body("description").notEmpty().trim(),
    body("numberPeople").notEmpty().trim().isFloat(),
    body("price").notEmpty().trim().isFloat(),
    body("roomNumbers").notEmpty().trim(),
    body("title").notEmpty().trim().isString(),
    body("hotel"),
  ],
  isAuth,
  adminPage.postNewRoomList
);

// router.post("/roomlist/deleted/:id/:id", isAuth, adminPage.deleteRoomList);

router.get("/roomlist/:id", isAuth, adminPage.getaddnewRooms);

router.post(
  "/roomlist/updated/:id",
  [
    body("description").notEmpty().trim(),
    body("numberPeople").notEmpty().trim().isFloat(),
    body("price").notEmpty().trim().isFloat(),
    body("roomNumbers").notEmpty().trim(),
    body("title").notEmpty().trim().isString(),
  ],
  isAuth,
  adminPage.postNewRoomList
);

module.exports = router;

const express = require("express");

const { query, body } = require("express-validator");

const router = express.Router();

const adminController = require("../controllers/admin");

const authenticateRouteAdmin = require("../middleware/admin");

router.post("/login", adminController.postLogin);

router.get("/admin", authenticateRouteAdmin, adminController.getDashbroad);

router.get(
  "/transactionlist",
  authenticateRouteAdmin,
  adminController.gettransactionList
);

// //* Hotel route *//
router.get("/hotel-list", authenticateRouteAdmin, adminController.gethotelList);

// router.get(
//   "/hotellist/newhotel",
//   authenticateRouteAdmin,
//   adminController.getAddnewHotel
// );

router.post(
  "/hotel-list/new-hotel",
  [
    body("Address").notEmpty().trim(),
    body("City").notEmpty().trim(),
    body("Description").notEmpty().trim(),
    body("Price").notEmpty().trim().isFloat(),
    body("Distance").notEmpty().trim(),
    body("Feature").notEmpty().trim(),
    body("Name").notEmpty().trim(),
    body("Images"),
    body("Rooms").notEmpty().trim(),
    body("Title").notEmpty().trim().isString(),
    body("Type").notEmpty().trim(),
  ],
  authenticateRouteAdmin,
  adminController.postNewHotelList
);

router.delete(
  "/hotel-list/deleted/:id",
  authenticateRouteAdmin,
  adminController.deleteHotelList
);

router.get(
  "/hotel-list/:id",
  authenticateRouteAdmin,
  adminController.getDetailHotel
);

router.put(
  "/hotel-list/updated/:id",
  [
    body("Address").notEmpty().trim(),
    body("City").notEmpty().trim(),
    body("Description").notEmpty().trim(),
    body("Price").notEmpty().trim().isFloat(),
    body("Distance").notEmpty().trim(),
    body("Feature").notEmpty().trim(),
    body("Name").notEmpty().trim(),
    body("Rooms").notEmpty().trim(),
    body("Title").notEmpty().trim().isString(),
    body("Type").notEmpty().trim(),
  ],
  authenticateRouteAdmin,
  adminController.updatedHotelList
);

// //* Room route *//
router.get("/room-list", authenticateRouteAdmin, adminController.getRoomsList);

router.get(
  "/room-list/new-room",
  authenticateRouteAdmin,
  adminController.getOptionHotels
);

router.delete(
  "/room-list/deleted/:id",
  authenticateRouteAdmin,
  adminController.deleteRoomList
);

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
  authenticateRouteAdmin,
  adminController.postNewRoomList
);

// router.get(
//   "/roomlist/:id",
//   authenticateRouteAdmin,
//   adminController.getaddnewRooms
// );

router.put(
  "/room-list/updated/:id",
  [
    body("description").notEmpty().trim(),
    body("numberPeople").notEmpty().trim().isFloat(),
    body("price").notEmpty().trim().isFloat(),
    body("roomNumbers").notEmpty().trim(),
    body("title").notEmpty().trim().isString(),
  ],
  authenticateRouteAdmin,
  adminController.updatedRoom
);

module.exports = router;

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
// router.get("/hotellist", authenticateRouteAdmin, adminController.gethotelList);

// router.get(
//   "/hotellist/newhotel",
//   authenticateRouteAdmin,
//   adminController.getAddnewHotel
// );

// router.post(
//   "/hotellist/newhotel",
//   [
//     body("Address").notEmpty().trim(),
//     body("City").notEmpty().trim(),
//     body("Description").notEmpty().trim(),
//     body("Price").notEmpty().trim().isFloat(),
//     body("far").notEmpty().trim(),
//     body("Feature").notEmpty().trim(),
//     body("Name").notEmpty().trim(),
//     body("Images"),
//     body("Rooms").notEmpty().trim(),
//     body("Title").notEmpty().trim().isString(),
//     body("Type").notEmpty().trim(),
//   ],
//   authenticateRouteAdmin,
//   adminController.postNewHotelList
// );

// router.post(
//   "/hotellist/deleted/:id",
//   authenticateRouteAdmin,
//   adminController.deleteHotelList
// );

// router.get(
//   "/hotellist/:id",
//   authenticateRouteAdmin,
//   adminController.getAddnewHotel
// );

// router.post(
//   "/hotellist/updated/:id",
//   [
//     body("Address").notEmpty().trim(),
//     body("City").notEmpty().trim(),
//     body("Description").notEmpty().trim(),
//     body("Price").notEmpty().trim().isFloat(),
//     body("far").notEmpty().trim(),
//     body("Feature").notEmpty().trim(),
//     body("Name").notEmpty().trim(),
//     body("Rooms").notEmpty().trim(),
//     body("Title").notEmpty().trim().isString(),
//     body("Type").notEmpty().trim(),
//   ],
//   authenticateRouteAdmin,
//   adminController.postNewHotelList
// );

// //* Room route *//
// router.get("/roomlist", authenticateRouteAdmin, adminController.getroomsList);

// router.get(
//   "/roomlist/newroom",
//   authenticateRouteAdmin,
//   adminController.getaddnewRooms
// );

// router.post(
//   "/roomlist/deleted/:id",
//   authenticateRouteAdmin,
//   adminController.deleteRoomList
// );

// router.post(
//   "/room-list/new-room",
//   [
//     body("description").notEmpty().trim(),
//     body("numberPeople").notEmpty().trim().isFloat(),
//     body("price").notEmpty().trim().isFloat(),
//     body("roomNumbers").notEmpty().trim(),
//     body("title").notEmpty().trim().isString(),
//     body("hotel"),
//   ],
//   authenticateRouteAdmin,
//   adminController.postNewRoomList
// );

// // router.post("/roomlist/deleted/:id/:id", authenticateRouteAdmin, adminController.deleteRoomList);

// router.get(
//   "/roomlist/:id",
//   authenticateRouteAdmin,
//   adminController.getaddnewRooms
// );

// router.post(
//   "/roomlist/updated/:id",
//   [
//     body("description").notEmpty().trim(),
//     body("numberPeople").notEmpty().trim().isFloat(),
//     body("price").notEmpty().trim().isFloat(),
//     body("roomNumbers").notEmpty().trim(),
//     body("title").notEmpty().trim().isString(),
//   ],
//   authenticateRouteAdmin,
//   adminController.postNewRoomList
// );

module.exports = router;

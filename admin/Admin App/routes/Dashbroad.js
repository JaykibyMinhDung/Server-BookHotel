const express = require("express");
const { query, body } = require('express-validator');
const router = express.Router();

const path = require("path");

const adminPage = require("../controllers/Dashbroad");

const isAuth = require("../middleware/isAuth");

router.get("/admin", isAuth, adminPage.getDashbroad);

router.get("/hotellist", isAuth, adminPage.gethotelList);

router.post("/hotellist/:id", isAuth, adminPage.deleteHotelList);

router.put("/hotellist/:id", [
    body('createdAt').notEmpty().trim(),         
    body('updatedAt').notEmpty().trim(),  
    body('description').notEmpty().trim(),
    body('maxPeople').notEmpty().trim().isFloat(),
    body('price').notEmpty().trim().isFloat(),
    body('numberRooms').notEmpty().trim(),
    body('Title').notEmpty().trim().isString(),
], isAuth, adminPage.postNewHotelList);

router.post("/hotellist/newhotel", [
    body('Address').notEmpty().trim(),         
    body('City').notEmpty().trim(),  
    body('Description').notEmpty().trim(),
    body('Price').notEmpty().trim().isFloat(),
    body('far').notEmpty().trim(),
    body('Feature').notEmpty().trim(),
    body('Name').notEmpty().trim(),
    body('Images'),
    body('Rooms').notEmpty().trim(),
    body('Title').notEmpty().trim().isString(),
    body('Type').notEmpty().trim(),
], isAuth, adminPage.postNewHotelList);

router.get("/hotellist/newhotel", isAuth, adminPage.getAddnewHotel);

router.post("/room-list/new-room", [ 
    body('description').notEmpty().trim(),
    body('numberPeople').notEmpty().trim().isFloat(),
    body('price').notEmpty().trim().isFloat(),
    body('roomNumbers').notEmpty().trim(),
    body('title').notEmpty().trim().isString(),
    body('hotel'),
], isAuth, adminPage.postNewRoomList);

router.get("/roomlist", isAuth, adminPage.getroomsList);

router.delete("/roomlist/:id", isAuth, adminPage.deleteRoomList);

router.put("/roomlist/:id", [
    body('createdAt').notEmpty().trim(),         
    body('updatedAt').notEmpty().trim(),  
    body('description').notEmpty().trim(),
    body('maxPeople').notEmpty().trim().isFloat(),
    body('price').notEmpty().trim().isFloat(),
    body('numberRooms').notEmpty().trim(),
    body('Title').notEmpty().trim().isString(),
], isAuth, adminPage.postNewRoomList);

router.get("/roomlist/newroom", isAuth, adminPage.getaddnewRooms);

router.get("/transactionlist", isAuth, adminPage.gettransactionList);

module.exports = router;

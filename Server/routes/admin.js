const path = require('path');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authenticateRouteAdmin = require('../middleware/admin')
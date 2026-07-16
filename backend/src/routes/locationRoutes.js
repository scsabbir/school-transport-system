const express = require("express");
const router = express.Router();

const {
    getDriverLocation
} = require("../controllers/locationController");


router.get("/:driverId", getDriverLocation);


module.exports = router;
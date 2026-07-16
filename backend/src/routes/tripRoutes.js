const express = require("express");
const router = express.Router();

const {
    createTrip,
    getTrips,
    getTripById,
    updateTripStatus
} = require("../controllers/tripController");


router.post("/", createTrip);

router.get("/", getTrips);

router.get("/:id", getTripById);

router.put("/:id/status", updateTripStatus);


module.exports = router;
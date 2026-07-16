const prisma = require("../config/prisma");


// Create Trip
exports.createTrip = async (req, res) => {
    try {
        const { vehicleId, routeId, date, status } = req.body;

        const trip = await prisma.trip.create({
            data: {
                vehicleId,
                routeId,
                date: new Date(date),
                status: status || "SCHEDULED"
            }
        });

        res.json({
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get All Trips
exports.getTrips = async (req, res) => {
    try {

        const trips = await prisma.trip.findMany({
            include: {
                vehicle: {
                    select: {
                        id: true,
                        vehicleNo: true,
                        capacity: true
                    }
                },
                route: true
            }
        });

        res.json({
            trips
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get Single Trip
exports.getTripById = async (req, res) => {
    try {

        const { id } = req.params;

        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                vehicle: true,
                route: true
            }
        });

        res.json({
            trip
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Update Trip Status
exports.updateTripStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const trip = await prisma.trip.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        });

        res.json({
            message: "Trip status updated",
            trip
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
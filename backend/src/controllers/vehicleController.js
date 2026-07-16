const prisma = require("../config/prisma");


// Create Vehicle
exports.createVehicle = async (req, res) => {
    try {
        const { vehicleNo, capacity, driverId } = req.body;

        const vehicle = await prisma.vehicle.create({
            data: {
                vehicleNo,
                capacity,
                driverId
            }
        });

        res.json({
            message: "Vehicle created successfully",
            vehicle
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get all vehicles
exports.getVehicles = async (req, res) => {
    try {

        const vehicles = await prisma.vehicle.findMany({
            include: {
                driver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        res.json({
            vehicles
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
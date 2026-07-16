const prisma = require("../config/prisma");


// Get latest driver location
exports.getDriverLocation = async (req, res) => {

    try {

        const { driverId } = req.params;


        const location = await prisma.location.findFirst({
            where: {
                driverId: Number(driverId)
            },
            orderBy: {
                createdAt: "desc"
            }
        });


        if (!location) {
            return res.status(404).json({
                message: "Location not found"
            });
        }


        res.json({
            success: true,
            location
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};
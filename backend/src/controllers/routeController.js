const prisma = require("../config/prisma");


// Create Route
exports.createRoute = async (req, res) => {
    try {
        const { name, startPoint, endPoint } = req.body;

        const route = await prisma.route.create({
            data: {
                name,
                startPoint,
                endPoint
            }
        });

        res.json({
            message: "Route created successfully",
            route
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get all Routes
exports.getRoutes = async (req, res) => {
    try {

        const routes = await prisma.route.findMany();

        res.json({
            routes
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get single Route
exports.getRouteById = async (req, res) => {
    try {

        const { id } = req.params;

        const route = await prisma.route.findUnique({
            where: {
                id: Number(id)
            }
        });

        res.json({
            route
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
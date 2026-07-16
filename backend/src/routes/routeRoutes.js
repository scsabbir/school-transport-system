const express = require("express");
const router = express.Router();

const {
    createRoute,
    getRoutes,
    getRouteById
} = require("../controllers/routeController");


router.post("/", createRoute);

router.get("/", getRoutes);

router.get("/:id", getRouteById);


module.exports = router;
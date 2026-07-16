const locationRoutes = require("./routes/locationRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const tripRoutes = require("./routes/tripRoutes");
const routeRoutes = require("./routes/routeRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const prisma = require("./config/prisma");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/location", locationRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "School Transport API Running"
    });
});


app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.json({
            success: true,
            users: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Profile accessed",
        user: req.user
    });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);


    socket.on("sendLocation", (data) => {

        console.log("Location:", data);

        io.emit("receiveLocation", data);

    });


    socket.on("sendLocation", async (data) => {

    console.log("Location:", data);

    try {
        await prisma.location.create({
            data: {
                driverId: data.driverId,
                latitude: data.latitude,
                longitude: data.longitude
            }
        });

        io.emit("receiveLocation", data);

    } catch (error) {
        console.log(error.message);
    }

});

});

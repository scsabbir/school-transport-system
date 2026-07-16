const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");


socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit("sendLocation", {
        driverId: 3,
        latitude: 23.8103,
        longitude: 90.4125
    });
});


socket.on("receiveLocation", (data) => {
    console.log("Location received:", data);
});
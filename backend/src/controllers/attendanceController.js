const prisma = require("../config/prisma");


// Create Attendance
exports.createAttendance = async (req, res) => {
    try {
        const { studentId, tripId, status } = req.body;

        const attendance = await prisma.attendance.create({
            data: {
                studentId,
                tripId,
                status: status || "PRESENT"
            }
        });

        res.json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get All Attendance
exports.getAttendance = async (req, res) => {
    try {

        const attendance = await prisma.attendance.findMany({
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        class: true
                    }
                },
                trip: {
                    include: {
                        vehicle: {
                            select: {
                                vehicleNo: true
                            }
                        },
                        route: true
                    }
                }
            }
        });

        res.json({
            attendance
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
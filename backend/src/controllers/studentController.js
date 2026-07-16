const prisma = require("../config/prisma");


// Create Student
exports.createStudent = async (req, res) => {
    try {
        const { name, className, age, parentId } = req.body;

        const student = await prisma.student.create({
            data: {
                name,
                class: className,
                age,
                parentId
            }
        });

        res.json({
            message: "Student created successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get all students
exports.getStudents = async (req, res) => {
    try {

        const students = await prisma.student.findMany({
    include: {
        parent: {
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
            students
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
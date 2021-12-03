const express = require("express");

const Student = require("../models/student.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const students = await Student.find().lean().exec();

        return res.send({ students });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

})

// find student who gave a particular evaluation

router.get("/:id", async (req, res) => {
    try {
        const students = await Student.find().populate("evaluation_id").lean().exec();

        const students_ans = [];

        students.forEach((student) => {
            student.evaluation_id.forEach((evaluation) => {
                if(evaluation._id == req.params.id) {
                    students_ans.push(student);
                }
            })
        })

        return res.send(students_ans)
        
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

// highest marks

router.get("/highestmarks/", async (req, res) => {
    try {
        const student = await Student.findOne({ field1 : 1 }).sort(last_mod, 1).run( function(err, doc) {
            var max = doc.last_mod;
       }).lean().exec();

       return res.send(student)
       
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();

        return res.send(student);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();

        return res.send("Deleted Successfully")
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router;

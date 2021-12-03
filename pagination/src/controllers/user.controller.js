const express = require("express");

const User = require("../models/user.model");

const Admin = require("../models/admin.model");

const sendMail = require("../utils/send-mail");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        sendMail(
            "server@user.com",
            user.email,
            `Welcome to ABC system ${user.first_name} ${user.last_name}`,
            `Hi ${first_name}, Please confirm your email address `,
            "<h1>Hi, Please confirm your email address</h1>"
        )

        const admins = await Admin.find().populate("user_ids").lean().exec();

        admins.user_ids.forEach((admin) => {
            
            sendMail(
                "server@admin.com",
                admin.email,
                `${user.first_name} ${user.last_name} has registered with us`,
                `Please welcome ${user.first_name} ${user.last_name}`,
                "<h1>Please Welcome Register user</h1>"
            )

        })

        return res.status(201).send({user, register: true});
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }

})

router.get("/", async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 2;

        //page = 1 skip (0) limit (2)

        //page = 2 skip (2) limit (2)

        // skip items = (page -1) * size
        const skip = (page - 1) * size;

        const users = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments()) / size)

        return res.send({ users, totalPages });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports = router



require("dotenv").config()
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {

    try {

        // check if the email address provided already exist
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        // if it already exists then throw an error 
        if (user) return res.status(400).json({ status: "failed", message: "Please provide different email address" })

        // else we will create the user
        user = await User.create(req.body)

        /*
        secret@123masaischool => mix and match and add some stuff => very long hash
        in hashing we can provide round 
        hashing => plain string(password) + salt(masaischool) or rehash => strong hash
        encryption => req string + salt => encrypted string => decrypt => raw string
        */

        // we will has the password as plain text password is harmful

        // we will create the token
        // types of authentication : 
        // 1: stateful => remember the user after the response is send
        // 2: stateless => forget the user after the response is send
        // we will use stateless

        const token = newToken(user)

        // return the user and the token

        res.status(201).json({ user, token });

    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
}

const login = async (req, res) => {
    try {
        // check if the email address provided already exist 
        let user = await User.findOne({email: req.body.email});
    
        // if it does not exist then throw an error 
        if (!user) return res.status(400).json({ status: "failed", message: "Please provide different email address" })
    
        // else we match the password

        const match = await user.checkpassword(req.body.password);
    
        // if not match then throw an error
        if (!match) return res.status(400).json({ status: "failed", message: "Please provide correct email address and password" })
    
        // if it matches then create the token 
        const token = newToken(user);
    
        // return the user and the token 
    
        res.status(201).json({user,token});

    } catch (e) {
        return res.status(500).json({status: "Failed", message: e.message});
    }


}

module.exports = { register, login };
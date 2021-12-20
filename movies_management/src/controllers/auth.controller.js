const register = (req,res) => {
    try {


        return res.status(201).send("registered");

    } catch (e) {
        return res.status(500).json({status: "Failed", message: e.message})
    }
}
const login = (req,res) => {
    try {


        return res.status(201).send("login successfully");
        
    } catch (e) {
        return res.status(500).json({status: "Failed", message: e.message})
    }
}

module.exports = { register, login };
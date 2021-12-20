const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,process.env.JWT_ACCESS_KEY, function (err,token) {
            if(err) return reject(err);
            return resolve(token);
        });
    });
}

module.exports = async (req,res,next) => {
    // if we received the bearer token in the header
    const bearerToken = req.headers.authorization;
    
    // if not received or token is not a bearer token then we will throw an error 

    if(! bearerToken || !bearerToken.startsWith("Bearer ")) return res.status(400).json({status: "failed",message:"Please provide a valid token"})

    // else we will try to get the user from the token 
    const token = bearerToken.split(" ")[1];
    console.log(token)

    let user;
    try {
      user = await verifyToken(token)
    } catch (e) {
        return res.status(500).json({status: "failed",message: "Please provide a valid token"})
    }

    // if no user found then we will throw an error
    if(!user) 
    return res.status(400).json({status: "failed",message: "Please provide a valid token"})

    // else we will attach the user to the request 
    req.user = user;

    // return next
    return next();
}

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const verifyToken = (token)=>{
//     return jwt.verify(token, process.env.JWT_TOKEN_KEY);
// }
// const authenticate = (req,res,next)=>{
//     try{
//         const bearerToken = req?.headers?.authorization;
    
//         if(!bearerToken || !bearerToken.startsWith("Bearer ")) return res.status(400).json({status:"failed",message:"Please provide a valid token"});

//         const token = bearerToken.split(" ")[1];

//         const user = verifyToken(token);                 

//         if(!user){
//             return res.status(500).json({status:"Failed", message:"User doesn't exist with given bearer token"});
//         }

//         req.user = user;

//         return next();
//     }
//     catch(e){
//         return res.json({message: e});
//     }
// }

// module.exports = {authenticate, verifyToken}
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.verifyAuth = async(req,res,next) => {
    // req.headers data will be provided by the user 
    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]

    try {
        // the token onces verify it contain the user id
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id }).select("_id")
        next()
    }
    catch(err) {
        console.log(err)
        return res.status(401).json({error: "Request is not authorized"})
    }
}
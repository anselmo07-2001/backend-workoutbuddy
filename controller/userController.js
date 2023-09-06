const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d"})
}


exports.autoLogin = async (req,res,next) => {
    const { token } = req.body
   
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = await userModel.findById(_id)
        res.status(200).json({ token, email })
    }
    catch(err) {
        res.status(400).json({error: err})
    }
    
}


exports.loginUser = async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.login(email,password)

        const token = createToken(user._id)

        res.status(200).json({user, token})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }

}

exports.signupUser = async (req,res) => {
    const { email, password } = req.body
    console.log(req.body)

    try {
        const user = await userModel.signup(email,password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err) {
        console.log(err)
        res.status(400).json({error: err.message})
    }
}



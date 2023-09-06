const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const schema = mongoose.Schema

const userSchema = new schema({
    email : {
        type: String,
        required: true,
        unique: true,
    
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.statics.signup = async function (email, password) {
    console.log("🚀 ~ file: userModel.js:20 ~ email, password:", email, password)

    //validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (password.length <= 5) throw Error("Password is to short")


    const isAccountExist = await this.findOne({ email })

    if (isAccountExist) {
        throw Error("Email already in use")
    }

    // salt and hash the passwd before store in db
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
}


userSchema.statics.login = async function(email,password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect email")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw Error("Incorrect Password")
    }

    return user
}

module.exports = mongoose.model("User", userSchema)
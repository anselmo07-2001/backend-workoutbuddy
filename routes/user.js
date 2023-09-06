const express = require("express")
const userController = require("../controller/userController")


// /api/user
const router = express.Router()

router.post("/login", userController.loginUser)
router.post("/autoLogin", userController.autoLogin)

router.post("/signup", userController.signupUser)


module.exports = router

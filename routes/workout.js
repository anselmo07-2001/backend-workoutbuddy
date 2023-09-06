const express = require("express")
const WorkoutModel = require("../models/workoutModel")
const workoutController = require("../controller/workoutController")
const requiredAuth = require("../middleware/requiredAuth")



// /api/workouts
const router = express.Router()

router.use(requiredAuth.verifyAuth)

router.get("/", workoutController.getWorkouts)
router.get("/:id", workoutController.getWorkout)
router.post("/", workoutController.createWorkout)
router.patch("/:id", workoutController.updateWorkout)
router.delete("/:id", workoutController.deleteWorkout)


module.exports = router
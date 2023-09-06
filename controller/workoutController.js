const WorkoutModel = require("../models/workoutModel")
const mongoose = require("mongoose")

exports.getWorkouts = async (req,res) => {
    const workouts = await WorkoutModel.find({userId: req.user})
                                       .sort({createdAt: -1})
                               
    res.status(200).json(workouts)
}


exports.getWorkout = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}


exports.createWorkout = async (req,res) => {
    const { title, load, reps } = req.body

    const errFields = []

    if (!title) {
        errFields.push("title")
    }

    if (!load) {
        errFields.push("load")
    }

    if (!reps) {
        errFields.push("reps")
    }

    if (errFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", errFields})
    }


    try {
        const userId = req.user
        const workout = await WorkoutModel.create({
            title,load,reps,userId 
        })
        return res.status(201).json(workout)
    }
    catch(err) {
        console.log(err)
        return res.status(400).json({error: err.message})
    }

}

exports.deleteWorkout = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}


exports.updateWorkout = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await WorkoutModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}
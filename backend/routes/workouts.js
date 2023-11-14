const express = require('express')
const Workout = require('../models/workoutModel')
const router = express.Router()
const {
    createWorkout, 
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//require auth for all workout routes
router.use(requireAuth)
//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router
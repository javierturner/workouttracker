const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "You must pick an exercise!"
            },
            name: {
                type: String,
                trim: true,
                required: "You must name the exercise!"
            },
            duration: {
                type: Number,
                required: "You must enter a duration (in minutes)."
            },
            weight: {
                type: Number,
            },
            distance: {
                type: Number,

            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number
            }
        }
    ]
},
{
    toJSON: {
        virtuals: true
    }
}
);

workoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0)
});

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;
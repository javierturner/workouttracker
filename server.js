//Required
const express = require ('express');
const logger = require ('morgan');
const mongoose = require ('mongoose');
const path = require ('path');

const PORT = process.env.PORT || 3000;
const db =require ('./models');
const app = express();

app.use(logger('dev'));
app.use (express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.end.MONGODB_URI || 'mongodb://localhost/budget', {
    useNewUrlParser: true,
    useFindAndModify: false
});

//HTML Routes
app.get('/stats', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/stats.html'))
});

app.get('/exercise', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


//API Routes
app.post('/api/workouts', ({body}, res) => {
    db.Workout.create(body)
    .then(workouts => res.json(workouts))
});

app.get('/api/workouts/range', (req, res) => {
    db.Workout.find()
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
});

app.get('/api/workouts', (req, res) => {
    db.Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.json(err))
});

app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { 
        $push: {exercises: req.body}
    })
    .then(workouts => res.json(workouts))
    .catch(err=> res.json(err))
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
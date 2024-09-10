import express from 'express'
import mongoose from "mongoose"
// ! Movies is our compiled model
// ! We use it to run mongoose methods
// ! like Movies.create() or Movies.find()
import Movies from './models/movies'

const app = express() 

const movieData = [
  { name: 'Diehard', movieId: 1 },
  { name: 'The Grinch', movieId: 2 },
  { name: 'Home Alone', movieId: 3 }
]

const router = express.Router()

// ! getting my movies
router.route('/api/movies').get(async (req, res) => {
  // ! Mongoose method .find() lets you grab ALL the movies from the db
  let obtainedMovies = await Movies.find()
  console.log("obtained these from db:", obtainedMovies)

  res.send(obtainedMovies)
})

// ! Getting an individual movie
router.route('/api/movies/:movieId').get(async (req, res) => {
  // ? req.params.movieId gives us the param named movieId
  const movieId = req.params.movieId // ! Get the id you're asking for, as a number
  console.log(movieId)

  // A mongoose model's .findById() method lets you look up objects by id
  // ? movieId = the mongoDB ID
  const obtainedMovie = await Movies.findById(movieId)
  console.log("movie obtained", obtainedMovie)

  res.send(obtainedMovie) // send movie obj to frontend as JSON
})

// ! Posting a movie
router.route('/api/movies').post(async (req, res) => {
  // ? If I sent a movie, how do I get what I sent in here?
  console.log('USER HAS SENT US:', req.body)
  const incomingMovie = req.body

  let savedMovie = await Movies.create(incomingMovie) // save to DB
  console.log("Just added", savedMovie)

  res.send(savedMovie) // send over the saved movie to frontend as JSON
})

// ! To get POSTing to work, we need to add this line:
app.use(express.json())

app.use(router)

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/moviesdb")
  console.log("Connected to the database!")

  app.listen(8000, () => {
    console.log('Express API is running on http://localhost:8000')
  })
}

start()
import { Request, Response } from "express"
import Movies from '../models/movies'

export const indexCtrl = async (req: Request, res: Response) => {
    // ! Mongoose method .find() lets you grab ALL the movies from the db
    let obtainedMovies = await Movies.find()
    console.log("obtained these from db:", obtainedMovies)
  
    res.send(obtainedMovies)
}
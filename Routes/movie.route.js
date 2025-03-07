const Router = require("express");
const isToken = require("../Middleware/auth");
const { addMovie, getMovie, getMovieById, updateMovie, deleteMovie } = require("../Controller/movie.controller");

const movieRouter = Router();

movieRouter.post("/addmovie" , isToken , addMovie);
movieRouter.get("/getmovie", getMovie);
movieRouter.get("/getmoviebyid/:id", getMovieById);
movieRouter.put("/updatemovie/:id", isToken , updateMovie);
movieRouter.delete("/deletemovie/:id", isToken , deleteMovie);

module.exports = movieRouter;
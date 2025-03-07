const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    Movie_Name: String,
    Release_Date: Date,
    Genre: String,
    Duration: String,
    Language: String,
    Director: String,
})

const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie; 
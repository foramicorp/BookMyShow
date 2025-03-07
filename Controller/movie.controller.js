const Movie = require("../Model/movie.model");


// ADDING MOVIE (ONLY ADMIN )
const addMovie = async (req, res) => {
    try {
      if (req.user.Role !== "admin") return res.status(403).json({ message: "Unauthorized" });
  
      const movie = new Movie(req.body);
      await movie.save();
  
      res.status(201).json({ message: "Movie added successfully", movie });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
// GET ALL MOVIES (PUBLIC)
const getMovie = async (req, res) => {

    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

// GET MOVIE BY ID 
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE MOVIE (ONLY ADMIN)
const updateMovie = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Movie updated successfully", movie });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE MOVIE (ONLY ADMIN)
const deleteMovie = async (req, res) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// EXPORTING THE FUNCTIONS 
module.exports = { addMovie, getMovie, getMovieById ,updateMovie, deleteMovie };
const Booking = require("../Model/booking.model");
const Movie = require("../Model/movie.model");
const Show = require("../Model/show.model");

// ADDING THE SHOW (ONLY ADMIN CAN ADD SHOWS)
const addShow = async (req, res) => {
    try {
        const { MovieName, Date, Time, TotalSeats , BookedSeats } = req.body;
        const user_id = req.user.userId; 

        console.log("User ID from Token:", user_id);

        if (!user_id) {
            return res.status(401).json({ message: "Unauthorized: User ID is missing from token." });
        }

        // Create a new show instance
        const newShow = new Show({
            MovieName, Date, Time, TotalSeats , BookedSeats 
        });

        await newShow.save(); // Save to database
        res.status(201).json({ message: "Show added successfully", show: newShow });
    } catch (error) {
        console.error("Error in createShow:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GETTING ALL SHOWS
const getShow = async (req, res) => {

    try {
        const shows = await Show.find({ movieId: req.params.movieId });
        res.json(shows);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }

};


// BOOKING SEATS FOR A SHOW (ONLY USER CAN BOOK SEATS)

const bookSeats = async (req, res) => {
    try {
        const { seats } = req.body;
        const showId = req.params.showId;
        const userId = req.user?.userId; 

        console.log("Booking Request:", { showId, seats, userId });

        // Ensure seats is an array
        if (!req.body.seats || !Array.isArray(req.body.seats) || req.body.seats.length === 0) {
            console.log("Invalid seats received:", req.body.seats);
            return res.status(400).json({ message: "Invalid seat selection. Seats should be a non-empty array." });
        }
        

        // Fetch the show
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: "Show not found" });
        }

        // Ensure BookedSeats is an array
        if (!Array.isArray(show.BookedSeats)) {
            show.BookedSeats = [];
        }

        console.log("Existing Booked Seats:", show.BookedSeats);

        // Check seat availability
        const isAvailable = seats.every(seat => !show.BookedSeats.includes(seat));
        if (!isAvailable) { 
            return res.status(400).json({ message: "Some seats are already booked" });
        }

        // Update booked seats
        show.BookedSeats.push(...seats);
        await show.save();

        // Create a new booking
        const booking = new Booking({ 
            userId,
            showId,
            seats, 
            paymentStatus: "Completed",
        });

        await booking.save();

        res.status(201).json({ message: "Seats booked successfully", booking });
    } catch (error) {
        console.error("Error in bookSeats:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    addShow,
    getShow,
    bookSeats
}
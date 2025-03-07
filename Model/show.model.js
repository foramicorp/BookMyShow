const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({

    Movie_Id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    },
    MovieName : String,
    Date : String ,
    Time : String,
    TotalSeats : Number,
    BookedSeats : Number,
    
})

const Show = mongoose.model("Show",showSchema);

module.exports = Show;
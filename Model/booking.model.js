const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Show", 
        required: true 
    },
    seats: {  
        type: [Number],  
        default: [0],
        required: true 
    }, 
    paymentStatus: {  
        type: String, 
        enum: ["Pending", "Completed"], 
        default: "Pending" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Booking", bookingSchema);

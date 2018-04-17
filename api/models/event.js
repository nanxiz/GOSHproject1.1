const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    date: Date,
    startTime: String,
    endTime: String,
    department: {type: String, default: "all"}
});

module.exports = mongoose.model('Event', eventSchema);
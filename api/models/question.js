const mongoose = require('mongoose')

// Quiz Schema
const questionSchema = mongoose.Schema({
    _id: String,
    question: String,
    options: Array,
    answer: Number,
    time: Number
})

module.exports = mongoose.model('Question', questionSchema)
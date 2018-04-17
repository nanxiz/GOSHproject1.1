const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
    name: String,
    score: Number,
    date: Date
})

const Result = module.exports = mongoose.model('Result', resultSchema)

// Get Results By Name (Not Used) --NEED TO FIGURE OUT HOW IT WORKS
module.exports.getResultsByName = function (name, callback) {
    const query = { name: name }
    Result.find(query, callback)
}
// Register Quiz Result
module.exports.registerResult = function (newResult, callback) {
    newResult.save(callback)
}
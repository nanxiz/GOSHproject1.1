const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    link: String
});

module.exports = mongoose.model('Link', linkSchema);
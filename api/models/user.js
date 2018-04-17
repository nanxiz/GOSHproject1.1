const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //_id: String,
    name: String,
    email: { 
        type: String, 
        /*required: true, */
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    department: String,
    university: String,
    password: { type: String/*, required: true */},
    points: Number,
    level: String,
    quiz1: Number,
    quiz2: Number, 
    quiz3: Number
});

module.exports = mongoose.model('User', userSchema);
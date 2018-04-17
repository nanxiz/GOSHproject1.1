const mongoose = require('mongoose');
//here we have sample objects, this will be studymodule (need to change name), need to update fields but it's the concept
const productSchema = mongoose.Schema({ //use schema to create. will have name,description and pic
    _id: mongoose.Schema.Types.ObjectId,
    name: { /*required: true,*/ type: String/*, required: true*/ }, //required true doesnt work idk why, works if put in the beginning
    description: { /*required: true,*/ type: String/*, required: true*/ },
    brief: String,
    productImage: { type: String },
    questions: [{_id: {type: String},
        question: {type: String},
        options: [{
            option: String,
            correct: {type: Boolean, default: false},
            selected: {type: Boolean, default: false}
        }],     
        time: {type: Number}}],
    department: {type: String, default: "all"}    
});

module.exports = mongoose.model('Product', productSchema);
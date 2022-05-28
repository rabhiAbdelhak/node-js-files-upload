const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
    name : {
        type: String,
        required : [true, 'The product name must be provided !'],
        minlength: [3, 'The product name must be more then 3 caracters'],
        maxlength: [30, 'The product name must be less then 30 caracters']
    },
    price : {
        type : Number,
        required : [true, 'The price must be provided'],
    },
    image : {
        type: String,
        required : [true, 'The image  must be provided !'],
    }
}, {timestamps : true});


module.exports = mongoose.model('Product', productSchema);
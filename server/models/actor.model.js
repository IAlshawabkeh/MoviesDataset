const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Schema = mongoose.Schema;

const Actor = new Schema({
    name: {
        type: String,
        required: true,
        es_type: 'text'
    },
    facebook_likes: {
        type: Number
    },
    age: {
        type: Number
    },
    facebook_page_link: {
        type: String
    }
});

module.exports = mongoose.model('Actor', Actor);
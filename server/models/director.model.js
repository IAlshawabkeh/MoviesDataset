const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Schema = mongoose.Schema;

const Director = new Schema({
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
    username: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Director', Director);
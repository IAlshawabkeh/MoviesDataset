const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Director = require('./director.model');
const Actor = require('./actor.model');
const { ELASTIC_SEARCH_CONNECTION } = require('../configs/config');

const Schema = mongoose.Schema;

const Movie = new Schema({
    title: {
        type: String,
        required: true,
        es_indexed: true,
        dropdups: true
    },
    duration: {
        type: Number,
        es_indexed: true
    },
    gross: {
        type: Number,
        es_indexed: true
    },
    genres: {
        type: [String],
        es_indexed: true
    },
    num_voted_users: {
        type: Number,
        es_indexed: true
    },
    cast_total_facebook_likes: {
        type: Number,
        es_indexed: true
    },
    plot_keywords: {
        type: [String],
        es_indexed: true
    },
    imdb_link: {
        type: String,
        es_indexed: true
    },
    num_user_for_reviews: {
        type: Number,
        es_indexed: true
    },
    language: {
        type: String,
        es_indexed: true
    },
    country: {
        type: String,
        es_indexed: true
    },
    content_rating: {
        type: String,
        es_indexed: true
    },
    budget: {
        type: Number,
        es_indexed: true
    },
    title_year: {
        type: Date,
        es_indexed: true
    },
    imdb_score: {
        type: Number,
        es_indexed: true,
        es_type: 'integer_range'
    },
    aspect_ratio: {
        type: String,
        es_indexed: true
    },
    movie_facebook_likes: {
        type: Number,
        es_indexed: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        es_schema: Director.schema,
        es_indexed: true,
        es_select: 'name facebook_likes'
    },
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'Actor',
        es_schema: Actor.schema,
        es_indexed: true,
        es_select: 'name facebook_likes',
        es_type: 'nested'
    }],
    color: {
        type: String,
        es_indexed: true
    }
});

Movie.plugin(mongoosastic, {
    ...ELASTIC_SEARCH_CONNECTION,
    bulk: {
        batch: 10
    }
});

module.exports = mongoose.model('Movie', Movie);
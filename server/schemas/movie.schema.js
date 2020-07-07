const Joi = require('joi');

const actor = require('./actor.schema');
const director = require('./director.schema');
// TODO use the actors and director schemas here!!!!!!
module.exports = {
        title: Joi.string().required(),
        duration: Joi.number(),
        gross: Joi.number(),
        genres: Joi.array().items(Joi.string()),
        num_voted_users: Joi.number(),
        cast_total_facebook_likes: Joi.number(),
        plot_keywords: Joi.array().items(Joi.string()),
        imdb_link: Joi.string().uri(),
        num_user_for_reviews: Joi.number(),
        language: Joi.string(),
        country: Joi.string(),
        content_rating: Joi.string(),
        budget: Joi.number(),
        title_year: Joi.date(),
        imdb_score: Joi.number(),
        aspect_ratio: Joi.string(),
        movie_facebook_likes: Joi.number(),
        actors: Joi.array().items(actor),
        director: director,
        color: Joi.string()
}
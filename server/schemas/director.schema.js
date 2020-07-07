const Joi = require('joi');

module.exports = {
        name: Joi.string().required(),
        facebook_likes: Joi.number(),
        age: Joi.number(),
        username: Joi.string(),
        password: Joi.number(),
}
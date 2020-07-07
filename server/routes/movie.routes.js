const MovieController = require('../controllers/movie.controller');
const Joi = require('joi');

const movie_schema = require('../schemas/movie.schema');

module.exports = [
    {
        path: '/api/movie',
        method: 'POST',
        handler: MovieController.create,
        options: {
            validate: {
                payload: Joi.object(movie_schema)
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/movie',
        method: 'GET',
        handler: MovieController.findAll,
        options: {
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/movie/{id}',
        method: 'GET',
        handler: MovieController.findOne,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/movie/{id}',
        method: 'DELETE',
        handler: MovieController.deleteOne,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/movie/{id}',
        method: 'PUT',
        handler: MovieController.update,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/movie/search',
        method: 'GET',
        handler: MovieController.searchMovies,
        options: {
            state: {
                parse: false,
                failAction: 'ignore'
            },
            validate: {
                query: Joi.object({
                    title: Joi.string().min(0),
                    genres: Joi.string().min(0),
                    plot_keywords: Joi.string().min(0)
                }).or('title', 'genres', 'plot_keywords')
            }
        }
    },
    {
        path: '/api/movie/count',
        method: 'GET',
        handler: MovieController.countMovies,
        options: {
            state: {
                parse: false,
                failAction: 'ignore'
            },
            validate: {
                query: Joi.object({
                    language: Joi.string().min(0),
                    country: Joi.string().min(0),
                    imdb_score: Joi.string().regex(new RegExp(/^\d+(\sTO\s)(.\d)?$/), { invert: false })
                    .min(0).error((err) => {
                        if (err) {
                            return {
                                message: 'imdb_score Must start and end with a number Also contain "TO" between them. ex: imdb_score=50+TO+20',
                            };
                        }
                    })
                }).or('language', 'country', 'imdb_score')
            }
        }
    },
    {
        path: '/api/movie/all',
        method: 'GET',
        handler: MovieController.getAllMoviesWithFilter,
        options: {
            state: {
                parse: false,
                failAction: 'ignore'
            },
            validate: {
                query: Joi.object({
                    genres: Joi.string().min(0),
                    plot_keywords: Joi.string().min(0)
                })
            }
        }
    }
];
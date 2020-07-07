const directorController = require('../controllers/director.controller');
const Joi = require('joi');

const director_schema = require('../schemas/director.schema');

module.exports = [
    {
        path: '/api/director',
        method: 'POST',
        handler: directorController.create,
        options: {
            validate: {
                payload: Joi.object(director_schema)
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/director',
        method: 'GET',
        handler: directorController.find
    },
    {
        path: '/api/director/{id}',
        method: 'GET',
        handler: directorController.findOne,
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
        path: '/api/director/{id}',
        method: 'DELETE',
        handler: directorController.deleteOne,
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
        path: '/api/director/{id}',
        method: 'PUT',
        handler: directorController.update,
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
    }
];
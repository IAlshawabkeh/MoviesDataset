const actorController = require('../controllers/actor.controller');
const Joi = require('joi');

const actor_schema = require('../schemas/actor.schema');

module.exports = [
    {
        path: '/api/actor',
        method: 'POST',
        handler: actorController.create,
        options: {
            validate: {
                payload: Joi.object(actor_schema)
            },
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },
    {
        path: '/api/actor',
        method: 'GET',
        handler: actorController.find
    },
    {
        path: '/api/actor/{id}',
        method: 'GET',
        handler: actorController.findOne,
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
        path: '/api/actor/{id}',
        method: 'DELETE',
        handler: actorController.deleteOne,
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
        path: '/api/actor/{id}',
        method: 'PUT',
        handler: actorController.update,
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
const actorService = require('../services/actor.service');

const create = async (req, res) => {
    try {
        const savedActor = await actorService.createActor(req.payload);
        return res.response(savedActor);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const find = async (req, res) => {
    try {
        const directos = await actorService.findAllActors();
        return res.response(directos);
    } catch (err) {
        return res.response(err).code(500);

    }
};

const findOne = async (req, res) => {
    try {
        const actor = await actorService.findOneById(req.params.id);
        return res.response(actor);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const update = async (req, res) => {
    try {
        const actor = await actorService.updateActor(req.payload, req.params.id);
        return res.response(actor);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const deleteOne = async (req, res) => {
    try {
        await actorService.removeActorById(req.params.id);
        return res.response({ msg: `Movie has deleted with id ${req.params.id}` });
    } catch (err) {
        return res.response(err).code(500);
    }
};

module.exports = {
    create, find, findOne, update, deleteOne
};
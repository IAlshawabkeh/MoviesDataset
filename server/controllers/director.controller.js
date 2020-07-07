const directorService = require('../services/director.service');

const create = async (req, res) => {
    try {
        const savedDirector = await directorService.createDirector(req.payload);
        return res.response(savedDirector);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const find = async (req, res) => {
    try {
        const directos = await directorService.findDirectors();
        return res.response(directos);
    } catch (err) {
        return res.response(err).code(500);

    }
};

const findOne = async (req, res) => {
    try {
        const director = await directorService.findOneById(req.params.id);
        return res.response(director);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const update = async (req, res) => {
    try {
        const director = await directorService.updateDirector(req.payload, req.params.id);
        return res.response(director);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const deleteOne = async (req, res) => {
    try {
        await directorService.removeDirectorById(req.params.id)
        return res.response({ msg: `Movie has deleted with id ${req.params.id}` });
    } catch (err) {
        return res.response(err).code(500);
    }
};

module.exports = {
    create, find, findOne, update, deleteOne
};
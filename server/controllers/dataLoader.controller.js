const dataLoaderService = require('../services/dataLoader.service');

const loadData = (req, res) => {
    try {
        dataLoaderService.loadData();
        return res.response('Movies dataset loading and processing initiated!');
    } catch (err) {
        return res.response(err).code(500);
    }
};

module.exports = { loadData };
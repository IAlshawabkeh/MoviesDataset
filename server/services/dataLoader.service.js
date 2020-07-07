const datasetLoader = require('../helpers/datasetLoader');

const loadData = () => {
    datasetLoader.loadDataset();
};

module.exports = { loadData };
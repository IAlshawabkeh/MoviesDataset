const dataLoader = require('../controllers/dataLoader.controller');

module.exports = [
    {
        path: '/api/dataset/load',
        method: 'GET',
        handler: dataLoader.loadData,
        options: {
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    }
];
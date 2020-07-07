const Hapi = require('hapi');
const Boom = require('@hapi/boom');
const routesLoader = require('../helpers/routesLoader');
const { mongoConnect, elasticConnect } = require('../configs/connection');

mongoConnect.then(() => require('../helpers/datasetLoader'));

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        console.error('ValidationError:', err.message);
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    routesLoader.loadRoutes.then(routes => {
        server.route(routes)
    }).then(() => {
        server.start();
    }).then(() => {
        console.log(`Server running on ${server.info.uri}`);
    }).catch(err => {
        console.log(err);
        process.exit(1);
    });
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init()
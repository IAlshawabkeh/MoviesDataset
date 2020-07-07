const fs = require('fs');

let routes = [];

module.exports.loadRoutes = new Promise((resolve, reject) => {
    fs.readdir('./server/routes', (err, routeFiles) => {
        if (err) {
            console.log(err);
            reject(err);
        };
        routeFiles.forEach(routeFileName => {
            routes = routes.concat(require(`../routes/${routeFileName}`));
        });
        resolve(routes);
    });
});

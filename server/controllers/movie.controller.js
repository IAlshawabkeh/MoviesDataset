const movieService = require('../services/movie.service');

const create = async (req, res) => {
    try {
        let director = req.payload.director;
        let actors = req.payload.actors;
        delete req.payload.director;
        delete req.payload.actors;
        const savedMovie = await movieService.createMovie(req.payload, director, actors);
        return res.response(savedMovie);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const findAll = async (req, res) => {
    try {
        const movies = await movieService.findAllMovies(req.query.populate);
        return res.response(movies);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const findOne = async (req, res) => {
    try {
        const movie = await movieService.findOneById(req.params.id, req.query.populate);
        return res.response(movie);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const update = async (req, res) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, req.payload);
        return res.response(movie);
    } catch (err) {
        return res.response(err).code(500);
    }
};

const deleteOne = async (req, res) => {
    try {
        const id = await movieService.removeMovieById(req.params.id);
        return res.response({ msg: `Movie has deleted with id ${id}` });
    } catch (err) {
        return res.response(err).code(500);
    }
};

const searchMovies = (req, res) => {
    return movieService.searchMovies(req.query).then(result => {
        return res.response(result);
    }).catch(err => {
        return res.response(err).code(500);
    });
}

const countMovies = (req, res) => {
    return movieService.countMovies(req.query).then(count => {
        return res.response(`The count of movies is ${count}`);
    }).catch(err => {
        return res.response(err).code(500);
    });
}

const getAllMoviesWithFilter = (req, res) => {
    return movieService.getAllMoviesWithFilter(req.query).then(result => {
        return res.response(result);
    }).catch(err => {
        return res.response(err).code(500);
    })
}
module.exports = {
    create, findAll, findOne, update, deleteOne, searchMovies, countMovies, getAllMoviesWithFilter
};
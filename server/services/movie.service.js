const Movie = require('../models/movie.model');
const directorService = require('./director.service');
const actorService = require('./actor.service');


const createMovie = async (payload, director, actors) => {
    let newMovie = new Movie(payload);
    let newDirector;
    let newActors = [];
    let tempActor;
    try {
        if (director.name) {
            newDirector = await directorService.createDirector(director);
        };

        if (actors.length > 0) {
            for (const actor of actors) {
                tempActor = await actorService.createActor(actor);
                newActors.push(tempActor);
            }
        }
        newMovie.actors = newActors;
        newMovie.director = newDirector;
        await newMovie.save();
        return newMovie;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const findAllMovies = (populate) => {
    if (populate) {
        return findAllMoviesWithDirectorAndActors();
    };
    return Movie.find({});
};

const findAllMoviesWithDirectorAndActors = () => {
    return Movie.find({}).populate('director').populate('actors');
};

const findOneById = (id, populate) => {
    if (populate) {
        return findOneByIdWithDirectorAndActors(id);
    }
    return Movie.findById(id);
};

const findOneByIdWithDirectorAndActors = (id) => {
    return Movie.findById(id).populate('director').populate('actors');
};

const updateMovie = async (id, payload) => {
    let attributes = {};
    if (payload.title) attributes.title = payload.title;
    if (payload.duration) attributes.duration = payload.duration;
    if (payload.gross) attributes.gross = payload.gross;
    if (payload.genres) attributes.genres = payload.genres;
    if (payload.num_voted_users) {
        attributes.num_voted_users = payload.num_voted_users;
    }
    if (payload.cast_total_facebook_likes) {
        attributes.cast_total_facebook_likes = payload.cast_total_facebook_likes;
    }
    if (payload.plot_keywords) {
        attributes.plot_keywords = payload.plot_keywords;
    }
    if (payload.imdb_link) {
        attributes.imdb_link = payload.imdb_link;
    }
    if (payload.num_user_for_reviews) {
        attributes.num_user_for_reviews = payload.num_user_for_reviews;
    }
    if (payload.language) attributes.language = payload.language;
    if (payload.country) attributes.country = payload.country;
    if (payload.content_rating) {
        attributes.content_rating = payload.content_rating;
    }
    if (payload.budget) attributes.budget = payload.budget;
    if (payload.title_year) attributes.title_year = payload.title_year;
    if (payload.imdb_score) attributes.imdb_score = payload.imdb_score;
    if (payload.aspect_ratio) {
        attributes.aspect_ratio = payload.aspect_ratio;
    }
    if (payload.movie_facebook_likes) {
        attributes.movie_facebook_likes = payload.movie_facebook_likes;
    }
    attributes.actors = []
    if (payload.actors) {
        for (const actor of payload.actors) {
            const savedActor = await actorService.createActor(actor);
            attributes.actors.push(savedActor._id);
        }
    }
    if (payload.director) {
        const director = await directorService.createDirector(payload.director);
        attributes.director = director._id;
    }
    if (payload.color) attributes.color = payload.color;

    return Movie.findByIdAndUpdate(id, attributes, { new: true, useFindAndModify: false });
};

const removeMovieById = (id) => {
    return Movie.findByIdAndRemove(id, { useFindAndModify: false }).then(document => {
        return document._id;
    }).catch(err => {
        console.log(err);
        return err;
    });
};

const searchMovies = (queryParams) => {
    let searchBody = {
        match: {}
    }

    if (queryParams.title) {
        searchBody.match.title = queryParams.title;
    }
    if (queryParams.genres) {
        searchBody.match.genres = queryParams.genres;
    }
    if (queryParams.plot_keywords) {
        searchBody.match.plot_keywords = queryParams.plot_keywords;
    }

    return new Promise((resolve, reject) => {
        Movie.search(
            searchBody,
            { hydrate: true },
            function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result.hits.hits);
            });
    });
}

const countMovies = (queryParams) => {
    let searchBody = {
    }

    if (queryParams.imdb_score) {
        searchBody.range = {
            imdb_score: {
                from: queryParams.imdb_score.substring(0, queryParams.imdb_score.indexOf('TO') - 1),
                to: queryParams.imdb_score.substring(queryParams.imdb_score.indexOf('TO') + 2)
            }
        }
    }
    if (queryParams.language || queryParams.country) {
        searchBody.match = {};
    }
    if (queryParams.language) {
        searchBody.match.language = queryParams.language;
    }
    if (queryParams.country) {
        searchBody.match.country = queryParams.country;
    }

    return new Promise((resolve, reject) => {
        Movie.search(
            searchBody,
            { hydrate: true },
            function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result.hits.total);
            });
    });
}

const getAllMoviesWithFilter = (queryParams) => {
    let searchBody = {
        bool: {
            must: {
                match_all: {}
            }
        }
    };

    if (queryParams.genres || queryParams.plot_keywords) {
        searchBody.bool.filter = [];
    }

    if (queryParams.genres) {
        searchBody.bool.filter.push({ "term": { "genres": queryParams.genres } });
    }
    if (queryParams.plot_keywords) {
        searchBody.bool.filter.push({ "term": { "plot_keywords": queryParams.plot_keywords } });
    }

    return new Promise((resolve, reject) => {
        Movie.search(
            searchBody,
            { hydrate: true },
            function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(result.hits.hits);
            });
    });
}

module.exports = { createMovie, findAllMovies, findOneById, updateMovie, 
    removeMovieById, searchMovies, countMovies, getAllMoviesWithFilter };
const fs = require('fs');
const csv = require('csv-parser');
const movieService = require('../services/movie.service');

let numOfRows = 0;

const loadDataset = () => fs.createReadStream('./server/assets/dataset.csv').pipe(csv()).on('data', (row) => {
    numOfRows++;
    processMovie(row);
}).on('end', async () => {
    console.log(`Successfully initiated insertion of all movies into the DB with a total number of ${numOfRows}`);
});

const processMovie = async (data) => {
    let payload = {};
    let actors = []
    if (data.actor_1_name) {
        actors.push({
            name: data.actor_1_name,
            facebook_likes: data.actor_1_facebook_likes ? Number(data.actor_1_facebook_likes) : 0
        });
    };

    if (data.actor_2_name) {
        actors.push({
                name: data.actor_2_name,
                facebook_likes: data.actor_2_facebook_likes ? Number(data.actor_2_facebook_likes) : 0
        });
    };

    if (data.actor_3_name) {
        actors.push({
            name: data.actor_3_name,
            facebook_likes: data.actor_3_facebook_likes ? Number(data.actor_3_facebook_likes) : 0
        });
    };

    let director = {};
    if (data.director_name) {
        director.name = data.director_name;
        director.facebook_likes = data.director_facebook_likes ? Number(data.director_facebook_likes) : 0
    }
    payload.aspect_ratio = data.aspect_ratio;
    payload.budget = data.budget ? Number(data.budget) : 0;
    payload.cast_total_facebook_likes = data.cast_total_facebook_likes ? Number(data.cast_total_facebook_likes) : 0;
    payload.color = data.color;
    payload.content_rating = data.content_rating;
    payload.country = data.country;
    payload.duration = data.duration ? Number(data.duration) : 0;
    payload.genres = data.genres ? data.genres.split('|') : [];
    payload.gross = data.gross ? Number(data.gross) : 0;
    payload.imdb_score = data.imdb_score;
    payload.language = data.language;
    payload.movie_facebook_likes = payload.movie_facebook_likes;
    payload.imdb_link = data.movie_imdb_link;
    payload.title = data.movie_title;
    payload.num_user_for_reviews = data.num_user_for_reviews ? Number(data.num_user_for_reviews) : 0;
    if (data.num_critic_for_reviews) {
        payload.num_user_for_reviews += Number(data.num_critic_for_reviews);
    };
    payload.num_voted_users = data.num_voted_users ? Number(data.num_voted_users) : 0;
    payload.plot_keywords = data.plot_keywords ? data.plot_keywords.split('|') : [];
    payload.title_year = data.title_year;

    return movieService.createMovie(payload, director, actors);
}

module.exports = { loadDataset };
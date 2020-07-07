const Director = require('../models/director.model');


const createDirector = async (payload) => {
    return findOneByName(payload.name).then((director) => {
        if (!director) {
            return Director.create(payload);
        }
        return director;
    });
};

const findOneByName = (name) => {
    return Director.findOne({ name })
}

const findDirectors = () => {
    return Director.find({});
};

const findOneById = (id) => {
    return Director.findById(id);
};

const updateDirector = (payload, id) => {
    let attributes = {};
    if (payload.name) attributes.name = payload.name;
    if (payload.facebook_likes) attributes.facebook_likes = payload.facebook_likes;
    if (payload.age) attributes.age = payload.age;
    if (payload.username) attributes.username = payload.username;
    if (payload.password) attributes.password = payload.password;

    return Director.findByIdAndUpdate(id, attributes, { new: true });
};

const removeDirectorById = (id) => {
    return Director.findByIdAndRemove(id);
};

module.exports = { createDirector, findDirectors, findOneById, updateDirector, removeDirectorById };
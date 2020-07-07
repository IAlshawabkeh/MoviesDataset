const Actor = require('../models/actor.model');

const createActor = (payload) => {
    return findOneByName(payload.name).then((actor) => {
        if (!actor) {
            return new Actor(payload).save();
        }
        return actor;
    });
};

const findOneByName = (name) => {
   return Actor.findOne({ name })
}

const findAllActors = () => {
    return Actor.find({});
};

const findOneById = (id) => {
    return Actor.findById(id);
};

const updateActor = (payload) => {
        let attributes = {};
        if (payload.name) attributes.name = payload.name;
        if (payload.facebook_likes) attributes.facebook_likes = payload.facebook_likes;
        if (payload.age) attributes.age = payload.age;
        if (payload.facebook_page_link) attributes.facebook_page_link = payload.facebook_page_link;
        
    return Actor.findByIdAndUpdate(id, attributes, { new: true, useFindAndModify: false});
};

const removeActorById = (id) => {
    return Actor.findByIdAndRemove(id, { useFindAndModify: false })
};


module.exports = { createActor, findAllActors, findOneById, updateActor, removeActorById };
const mongoose = require('mongoose');
const { DB_CN_STRING } = require('./config');


const mongoConnect = mongoose.connect(DB_CN_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(resolved => {
    console.log("mongoose is connected");
}).catch(err => {
    console.log("err", err);
});


module.exports = { mongoConnect }

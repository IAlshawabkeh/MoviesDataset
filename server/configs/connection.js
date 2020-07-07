const mongoose = require('mongoose');
const { DB_CN_STRING } = require('./config');


mongoose.connect(DB_CN_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(resolved => {
    console.log("mongoose is connected");
}).catch(err => {
    console.log("err", err);
});

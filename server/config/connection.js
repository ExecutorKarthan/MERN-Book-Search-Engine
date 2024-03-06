//Configure a connection file to facilitate the connection to the mongoose database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

//Export module for use
module.exports = mongoose.connection;

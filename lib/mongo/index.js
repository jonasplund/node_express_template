var dbConfig = require('_/config').dbConnection;
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + dbConfig.host + '/' + dbConfig.database);
var db = mongoose.connection;

module.exports = db;
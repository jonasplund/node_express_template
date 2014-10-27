var path = require('path');
var express = require('express');
var config = require('_/config');
var db = require('_/mongo');

var app = express();

app.set('views', config.viewDir);
app.set('view engine', 'jade');
app.locals.config = config;

app.use(require('connect-livereload')({ port: 4002 }));
app.use(require('compression')());
app.use(express.static(config.pubDir));
app.use(require('./routes.js'));

app.use(require('_/middleware/notFound'));
app.use(require('_/middleware/handleError'));

module.exports = app;
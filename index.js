var app = require('_/app');
var config = require('_/config');
var log = require('_/log');

module.exports = function () {
    app.listen(config.port);
    log.info('express is listening on port', config.port);
}
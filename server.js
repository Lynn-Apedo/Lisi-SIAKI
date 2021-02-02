const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
cors = require('cors'),
routes = require('./routes'),
notFoundHandler = require("./middleware/not_found_404_handler"),
errorHandler = require("./middleware/error_handler");

const server = express();
server.use(morgan('dev'));
server.use('/', cors());
server.use(bodyParser.json());

server.use('/api', routes);
server.use('*', notFoundHandler);
server.use(errorHandler)

server.listen('2046', () => {
    console.log('***Be more organized with Lisi-siaki!');
});

module.exports = server;

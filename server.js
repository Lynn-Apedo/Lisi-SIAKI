const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
cors = require('cors'),
routes = require('./routes');


const server = express();
server.use(morgan('dev'));
server.use('/', cors());
server.use(bodyParser.json());

server.use('/api', routes);


server.listen('2046', () => {
    console.log('***Be more organized with Lisi-siaki!');
});

module.exports = server;

'use strict'

const http = require('http');

const router = require('./router.js');

const server = http.createServer(router);

server.listen(8080);

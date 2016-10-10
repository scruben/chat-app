'use strict'

const http = require('http');

const dm = require('./datamanager.js');
const router = require('./router.js');

dm.initDBMessages();
setInterval(function () {
  dm.saveDB();
}, 5000);

const server = http.createServer(router);

server.listen(8080);

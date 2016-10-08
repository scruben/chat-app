'use strict';

const qs = require('querystring');
const url = require('url');
const fs = require('fs');

const dm = require('./datamanager.js');
const ut = require('./utils.js');

module.exports = function (req, res) {
  let file;

  if (req.method === 'POST' && req.url === '/messages') {

    // write message to the 'database'
    file = undefined;
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var message = qs.parse(body);
      dm.writeMessage(message);
    });

  } else if (req.method === 'GET' && url.parse(req.url).pathname === '/messages') {

    // get all the messages
    var searchOptions = ut.parseSearch((url.parse(req.url)).search);
    var arrMessages = dm.loadMessages(searchOptions);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(arrMessages));

  } else if (req.url === '/index.html' || req.url === '/') {

    // serve index.html
    file = 'static/index.html';

  } else if (req.url.indexOf('.') !== -1) {

    // return files like .js or .css
    if (ut.fileExists('./static'+req.url)) file = './static'+req.url;
    else {
      // if file is not found
      res.statusCode = 404;
      file = 'static/404.html';
    }

  } else {

    res.statusCode = 404;
    file = 'static/404.html';

  }

  if (file !== undefined) {
    fs.readFile(file, function (err, data) {
      res.end(data);
    });
  } else {
    res.end();
  }
};

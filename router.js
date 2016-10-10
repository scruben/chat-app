'use strict';

const qs = require('querystring');
const url = require('url');
const fs = require('fs');

const dm = require('./datamanager.js');
const ut = require('./utils.js');

module.exports = function (req, res) {

  if (req.method === 'POST' && req.url === '/messages') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var message = qs.parse(body);
      var output = dm.writeMessage(message);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(output));
    });
  } else if (req.method === 'GET' && url.parse(req.url).pathname === '/messages') {
    var searchOptions = ut.parseSearch((url.parse(req.url)).search);
    var arrMessages = dm.loadMessages(searchOptions);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(arrMessages));

  } else if (req.url === '/index.html' || req.url === '/') {
    let file = 'static/index.html';
    fs.readFile(file, function (err, data) {
      res.end(data);
    });
  } else if (req.url.indexOf('.') !== -1) {
    if (ut.fileExists('./static'+req.url)) {
      let file = './static'+req.url;
      fs.readFile(file, function (err, data) {
        res.end(data);
      });
    } else {
      // if file is not found
      res.statusCode = 404;
      let file = 'static/404.html';
      fs.readFile(file, function (err, data) {
        res.end(data);
      });
    }
  } else {
    res.statusCode = 404;
    file = 'static/404.html';
    fs.readFile(file, function (err, data) {
      res.end(data);
    });
  }
};

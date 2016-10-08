'use strict';

const fs = require('fs');
const qs = require('querystring');

const dm = require('./datamanager.js')

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
  } else if (req.method === 'GET' && req.url === '/messages') {
    // get all the messages
    var arrMessages = dm.loadMessages();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(arrMessages));
  } else if (req.url === '/index.html' || req.url === '/') {
    // serve index.html
    file = 'static/index.html';
  } else if (req.url.indexOf('.') !== -1) {
    // return files like .js or .css
    if (fileExists('./static'+req.url)) file = './static'+req.url;
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

// Checks if file exists
function fileExists(filePath)
{
  try
  {
    return fs.statSync(filePath).isFile();
  }
  catch (err)
  {
    return false;
  }
}

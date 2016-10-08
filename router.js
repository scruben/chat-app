'use strict';

const fs = require('fs');
const qs = require('querystring');

module.exports = function (req, res) {
  let file;
  if (req.method === 'POST' && req.url === '/messages') {
    file = undefined;
    var body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6)
          req.connection.destroy();
    });
    req.on('end', function () {
      var message = qs.parse(body);
      fs.appendFile('./db/messages.db','\n'+message.content);
    });
  } else if (req.method === 'GET' && req.url === '/messages') {
    // fs.readFile('db/messages.db', "utf-8", (err, data) => {
    //   res.setHeader('Content-Type', 'application/json');
    //   if (err) throw err;
    //   var arrMessages = data.split('\n');
    //   for (var i=0; i<arrMessages.length; i++) {
    //     arrMessages[i] = { content: arrMessages[i]};
    //   }
    //   res.end(JSON.stringify(arrMessages));
    // });
        var data = fs.readFileSync('db/messages.db', "utf-8");
        res.setHeader('Content-Type', 'application/json');
        var arrMessages = data.split('\n');
        for (var i=0; i<arrMessages.length; i++) {
          arrMessages[i] = { content: arrMessages[i]};
        }
        res.end(JSON.stringify(arrMessages));
  } else if (req.url === '/index.html' || req.url === '/') {
    file = 'static/index.html';
  } else if (req.url.indexOf('.') !== -1) {
    // TODO; rewrite this to better detection and send correct header
    // according to the extension
    if (fileExists('./static'+req.url)) file = './static'+req.url;
    else {
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

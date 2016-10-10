'use strict';

const fs = require('fs');

exports.fileExists = function (filePath)
{
  try
  {
    return fs.statSync(filePath).isFile();
  }
  catch (err)
  {
    return false;
  }
};

exports.parseSearch = function (str) {
  // input   ?limit=10&lasttimestamp=242342342342
  // output  { limit: 10, lasttimestamp: 242342342342 }
  var output = {};
  var reg = /(\w+\=\d+)+/g;
  var searches = str.match(reg);
  if (searches !== null) {
    for (var i = 0; i < searches.length; i++) {
      var temp = searches[i].split('=');
      if (temp.length === 2) output[temp[0]] = Number(temp[1]);
    }
  }
  return output;
};

'use strict';

const fs = require('fs');
const database = './db/messages.db';

// TODO: refactor to async functions

exports.writeMessage = function(message) {
  fs.appendFile(database,'\n'+
    JSON.stringify({content: message.content, timestamp: Date.now()})
  );
};

exports.loadMessages = function() {
  var data = fs.readFileSync(database, "utf-8");
  var arrMessages = data.split('\n');
  var output = [];
  for (var i=0; i<arrMessages.length; i++) {
    if (arrMessages[i] !== '') output.push(JSON.parse(arrMessages[i]));
  }
  return output;
}

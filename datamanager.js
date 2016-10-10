'use strict';

const fs = require('fs');
const database = './db/messages.db';

exports.messages;

exports.initDBMessages = function() {
  var data = fs.readFileSync(database, "utf-8");
  var arrMessages = data.split('\n');
  exports.messages = [];
  for (var i=0; i<arrMessages.length; i++) {
    if (arrMessages[i] !== '') exports.messages.push(JSON.parse(arrMessages[i]));
  }
}

exports.writeMessage = function(message) {
  var now = Date.now();
  exports.messages.push({content: message.content, timestamp: now});
  return {content: message.content, timestamp: now};
};

exports.loadMessages = function(options) {
  var output = exports.messages.slice(0);
  if (options !== undefined && options.lasttimestamp !== undefined) {
    var indexWhereToCut = -1;
    for (var j = 0; j < exports.messages.length; j++) {
      if (exports.messages[j].timestamp > options.lasttimestamp) {
        indexWhereToCut = j;
        break;
      }
    }

    if (indexWhereToCut !== -1) output = exports.messages.slice(indexWhereToCut);
    else output = [];
  }
  if (options !== undefined && options.limit !== undefined &&
    exports.messages.length > options.limit) {
    output = exports.messages.slice(exports.messages.length-options.limit);
  }
  return output;
}

exports.saveDB = function() {
  fs.writeFile(database, '', function(){
    for (var i = 0; i < exports.messages.length; i++) {
      fs.appendFile(database,'\n'+
        JSON.stringify(exports.messages[i])
      );
    }
  });
}

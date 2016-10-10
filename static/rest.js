'use strict';

let lastMsgTime;

function postMsg (text) {
  $.post('/messages', {content: text}, function (data) {
    appendMsgs([data]);
  });
}

function appendMsgs (msgsArr) {
  if (msgsArr.length) {
    for (let i = 0; i < msgsArr.length; i++) {
      let msg = msgsArr[i];
      lastMsgTime = msgsArr[msgsArr.length-1].timestamp;
      let $div = $('<div class="message">');
      $('#messages').append(`
        <div class="message">
          <p>${msg.content}</p>
        </div>
      `);
      keepScrolled('#messages');
    }
  }
}

function getLatestMessages (opts) {
  let defs = {limit: 5};
  opts = opts || defs;
  // let url = `/messages?limit=5`;
  let url = opts.timestamp ? `/messages?lasttimestamp=${lastMsgTime}` : `/messages?limit=${opts.limit}`;
  $.get(url, appendMsgs);
}

function keepScrolled(elementId) {
  $(elementId).animate({ scrollTop: $(elementId)[0].scrollHeight}, 100);
}

$(function () {

  getLatestMessages({limit: 5});

  $('button').click(function () {
    let text = $('input').val();
    text && postMsg(text);
    $('input').val('');
  });

  setInterval(function () {
    getLatestMessages({timestamp: lastMsgTime});
  }, 5000);
});

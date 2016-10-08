'use strict';

let lastMsgTime;

function postMsg (text) {
  $.post('/messages', {content: text}, function (data) {
    appendMsgs([{content: text}]);
  });
}

function appendMsgs (msgsArr) {
  if (msgsArr.length) {
    for (let i = 0; i < msgsArr.length; i++) {
      let msg = msgsArr[i];
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

function getLatestMessages () {
  let url = `/messages?limit=10&lasttimestamp=242342342342`;
  $.get(url, appendMsgs);
}

function keepScrolled(elementId) {
  $(elementId).animate({ scrollTop: $(elementId)[0].scrollHeight}, 100);
}

$(function () {

  getLatestMessages();

  $('button').click(function () {
    let text = $('input').val();
    text && postMsg(text);
    $('input').val('');
  });

  setInterval(function () {
    getLatestMessages();
  }, 5000);
});

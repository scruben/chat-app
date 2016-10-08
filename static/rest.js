
let lastMsgTime;

function postMsg (text) {
  $.post('/messages', {content: text}, function (data) {
    appendMsgs([{content: text}]);
  });
}

function appendMsgs (msgsArr) {
  //msgsArr = JSON.stringify(msgsArr);
  if (msgsArr.length) {
    //lastMsgTime = msgsArr[0].timestamp;
    for (let i = 0; i < msgsArr.length; i++) {
      let msg = msgsArr[i];
      //let timeStr = new Date(msg.timestamp).toLocaleTimeString();
      let $div = $('<div class="message">');
      //$div.append()
      // $('#messages').append(`
      //   <div class="message">
      //     <div class="time">Time: ${timeStr}</div>
      //     <p>${msg.content}</p>
      //   </div>
      // `);
      $('#messages').append(`
        <div class="message">
          <p>${msg.content}</p>
        </div>
      `);
      keepScrolled('#messages');
    }
  }
}

// get messages, by default the last 10 messages, if timestamp
// will return messages written after that timestamp
function getLatestMessages () {
  let url = `/messages`;
  $.get(url, appendMsgs);
}

// keep the scroll at the bottom of the element
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
  }, 20000);
});

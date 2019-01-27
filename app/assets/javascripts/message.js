$(function(){
  function buildHTML(message){
    var html = `<div class="messages data-message-id="${ message.id }">
                  <div class"chat-main__body">
                    <div class="main__message">
                      <div class="chat-main__message-name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-time">
                        ${message.created_at}
                      </div>
                      <div class="chat-main__message-body">
                        <p class="lower-message__content">${message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-flaim').append(html);
      $('#new_message')[0].reset();
      $('.chat-flaim').animate({scrollTop: $('.chat-flaim')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })

// 自動更新
 var interval = setInterval(function() {
    var last_message = $('.messages').last().data('message-id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: "GET",
        data: { id: last_message },
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message) {
          $('.chat-flaim').append(buildHTML(message));
          $('.chat-flaim').animate({scrollTop: $('.chat-flaim')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      })
    } else {
      clearInterval(interval);
    }
  } , 5000 );
});

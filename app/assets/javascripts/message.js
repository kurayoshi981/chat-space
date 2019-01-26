$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main__body">
                  <div class="chat-main__body-list">
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
                </di>`
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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    })
    .fail(function(){
      alert('error');
    })
  })
});


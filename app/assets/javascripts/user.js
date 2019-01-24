$(document).on('turbolinks:load', function(){
  function displayUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name }
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name='${user.name}'>追加</a>
                </div>`
    return html;
  }

  function noUserName(message){
    var display = `<div class="chat-group-users clearfix">
                    <p class="chat-group-user__name">${message}</p>
                   </div>`
    return display;
    }


  function addUser(userId, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }


  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input},
      processData: false,
      contentType: false,
      dataType: 'json'
      })

    .done(function(data){
      $('#user-search-result').empty();
      if(data.lenght !== 0){
        data.forEach(function(user){
        var html = displayUser(user);
        $('#user-search-result').append(html);
        console.log(user)
        })
      }
      else {
        var display = noUserName("一致するユーザーはいません");
      $('#chat-group-users').append(display);
     }
    })
    .fail(function(){
      alert('error');
    });
  });


  $('#user-search-result').on('click', '.user-search-add',function(){
    var userId = $(this).data("user-id")
    var name = $(this).data("user-name")
    $(this).parent().remove()
    var html = addUser(userId, name);
    $('#chat-group-users').append(html);
  });

  $('#chat-group-users').on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  })
});

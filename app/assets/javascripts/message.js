$(function() {
  function  buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image.url} >`: "";
    var html =  ` <div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <div class="lower-message__content">
                        ${message.content}
                      </div>
                      ${image}
                    </div>
                  </div>`
    return html
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
    .done(function(messages){
      var html = buildHTML(messages);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
    .fail(function(data){
      alert("失敗しました")
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('message-id')
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
      
    })
    .done(function (messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
});
$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : '';
    var img = message.image ? `<img src= ${ message.image }>` : ''; 
    var html = `<div class="message" data-id="${message.id}">
    <div class="upper-message">
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
        ${message.date}
      </div>
    </div>
    <div class="lower-message">
      <p class="lower-message__content">
        ${content}
        ${img}
      </p>
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
});
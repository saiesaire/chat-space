$(function(){
  function addUser(user) {
    var html = `
      <div class = "chat-group-user cleafix>
        <p class = "chat-group-user__name">${user.name}</p>
        <div class = "user-serch-add chat-group-user__btn chat-group-user__btn--add" data-user-if = "${user.name}">追加</div>
      </div>
    `;
    $("#user-serch-result").append(html);
  }

  function addNoUser() {
    var html = `
      <div class = "chat-group-user cleafix">
        <p class = "chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-serch-result").append(html);
  }
  function addDeleteUser(name, id) {
    var html = `
      <div class = "ChatMember cleafix" if = "${id}>
        <p class = "ChatMember__name>${name}</p>
        <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>
    `;
    $("#user-serch-result").append(html);
  }
  $('#user-search-field').on(`keyup`, function(){
    var input = $('#user-search-field').val(); 
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })
      .done(function(users) {
        $('#user-serch-result').empty();
        
        if (users.length !== 0) {
          users.forEach(function(user){
            addfUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
});
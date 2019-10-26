$(function(){
  $('#user-search-field').on(`keyup`, function(){
    var input = $("#user-search-field").val();;    //フォームの値を取得して変数に代入する
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data: { keyword: input},
    })
      .done (function(users){
        console.log("成功です");
      })
      .fail (function(users){
        console.log("失敗です");
      })
  })
});
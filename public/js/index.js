/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 9. 2.
 * Time: 오전 4:15
 * To change this template use File | Settings | File Templates.
 */
$().ready(function(){
  // create socket
  $("input#login").click(function() {
    $.post("/login/"+$("input#userid").val())
  });
  $("input#logout").click(function() {
    $.post("/logout");
  });
});

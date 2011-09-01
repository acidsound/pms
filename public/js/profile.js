/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 8. 20.
 * Time: 오전 2:32
 * To change this template use File | Settings | File Templates.
 */
// onLoad
$().ready(function(){
  // create socket
  var socket = io.connect("/");
  socket.on("enterCar", function(msg) {
    $("#fanID").append("<li>"+msg.fanID+"</li>");
  });
  $("input#regsisterFan").click(function() {
    socket.emit(
      "enterCar",
      {
        "userID": $("#userID").text(),
        "fanID": $("#registerFanName").val()
      }
    );
  });
});
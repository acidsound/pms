/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 9. 2.
 * Time: 오전 4:15
 * To change this template use File | Settings | File Templates.
 */
$().ready(function(){
  // create socket
  addLog=function(target, val) {
    $(target).text($(target).text()+val);
  };
  var socket = io.connect('/');
  socket.on('fromTCPPacket', function (data) {
    addLog($("textarea#log"), "incoming message :" + data);

    // 예상데이터 cg001T/ cg001F
    if (data.substr(0,2)=="cg") {
      $('li>label+input#'+data.substr(0,5)).attr('checked', data.substr(5,1)=='T');
    }
  });

  // when checkbox change. send tcpPacket
  $("li>label+input").change( function() {
    var msg = this.value + ($(this).attr('checked') ? "T":"F");
    socket.emit("toTCPPacket", msg);
    addLog($("textarea#log"), "outgoing message :" + msg +"\r\n");
  });
});

/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 9. 2.
 * Time: 오전 3:03
 * To change this template use File | Settings | File Templates.
 */
function init() {
  var filename = __dirname+"/config.json";
  var text = require("fs").readFileSync(filename);
  if(!text) {
    throw new Error("Couldn't read config file "+filename);
  }
  var obj = JSON.parse(text);
  console.log("Successfully read and parsed config file \n"+JSON.stringify(obj, null, " ")+"\n");
  return obj;
}

/*git test 인니다 ㅋㅋㅋㅋㅋㅋ*/

exports.params = init();
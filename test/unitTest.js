  /**
   * Created by JetBrains WebStorm.
   * User: acidsound
   * Date: 11. 9. 2.
   * Time: 오전 5:16
   * To change this template use File | Settings | File Templates.
   */
var
  assert = require('assert'),
  http = require('http'),
  server = require('../server'),
  callbackFired = false;

  server.server.listen(3000);
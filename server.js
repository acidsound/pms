/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var config = require('./config').params;

// Database
var Mongolian = require("mongolian");
var db = new Mongolian(config.database.connectionURL);
var collection = db.collection("pcc");

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');  // app.settings 로 접근
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.sessionKey }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  // disable layout
  app.set("view options", {layout: false});

  // make custom html template
  app.set("view engine", "html");
  app.register('.html', {
    compile: function(str, options){
      return function(locals){
        var window = require("jsdom").jsdom(str).createWindow();
        var $ = require("jquery").create(window);
        if(options.domParse) options.domParse.forEach(function(val) {
          if(typeof(val[1])=='function') {
            val[1]($(val[0]));
          } else {
            $(val[0]).html(val[1]);
          }
        });
	      return window.document.innerHTML;
      };
    }
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Handle DB I/O
registerFan = function (msg, socket, callback) {
  collection.insert(msg, function(err, post) {
    if (err) {
      console.log(err.message);
    } else {
      console.log(post.message);
      callback();
    }
  })
}

getAllParams = function(userID, callback) {
  var result = [];
  collection.find({"userID":userID}).forEach(function(post) {
    console.log(post);
  }, function(err) {
    // err
  });
  callback(result);
};

// url routes
app.get('/', function(req, res){
  res.render("index", {
    domParse : [
      ["title", "Index"],
      ["#flash p", req.flash.info ? req.session.flash.info[0]:""],
      ["#loginContainer", function($) { if(req.session.userid) $.remove() }],
      ["#logoutContainer", function($) { if(!req.session.userid) $.remove() }],
      ["#greetingMessage", req.session.userid ?
        req.session.userid + "님 어서오세요" : "일단 로그인부터 하시죠?" ]
    ]
  });
});

app.post('/login/:userid', function(req, res) {
  if(req.params.userid) {
    console.log('%s has login',req.params.userid);
    req.session.userid = req.params.userid;
    req.flash('info', '%s logged in', req.params.userid);
  } else {
    req.flash('info', 'id는?');
  }
  res.redirect('back');
});

app.post('/logout', function(req, res){
  console.log('%s has logout',req.session.userid);
  req.session.destroy();
  res.redirect('back');
});

// socket.io messages
var io = require("socket.io").listen(app);
io.sockets.on('connection', function (socket) {
  console.log('connected '+ socket.id);
  socket.on('disconnect', function() {
    socket.emit(socket.id + " disconnected");
  });
  socket.on('enterCar', function(msg) {
    console.log("%s added %s in list", msg.userID, msg.fanID);
    registerFan(msg, socket, function() {
      console.log("call callback");
      socket.emit('registerFan', msg);
    });
  });
});

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
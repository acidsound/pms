/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

// Database
var Mongolian = require("mongolian");
var db = new Mongolian("mongo://127.0.0.1:28017/pcc");
var collection = db.collection("sns");

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');  // app.settings 로 접근
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret4u' }));
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
          $(val[0]).html(val[1]);
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
      ["title", "NoTitle"],
      ["p#first", "first paragraph"],
      ["span#one", "span one"],
      ["div>ul>li>span", "mushroom"]
    ]
  });
});

app.get('/profile/:userID', function(req, res){
  var parseArray = [];
  getAllParams(req.params.userID, function(params) {
    for(i in params) {
      parseArray.unshift(["#"+i,
        i=="userID" ? params[i] : "<li>"+params[i]+"</li>"
      ]);
    }
    res.render("profile", {
      domParse: parseArray
    });
  });
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

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
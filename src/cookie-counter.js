// https://github.com/expressjs/cookie-session
var cookieSession = require('cookie-session')
var express = require('express')
var util = require('util');
var cookieParser = require("cookie-parser");

var app = express()

/* 
Although the app will not fail to run if the application variable
trust proxy is not set, it will incorrectly register the proxy’s
IP address as the client IP address unless trust proxy is configured.
*/
app.set('trust proxy', 1) // trust first proxy: https://expressjs.com/en/guide/behind-proxies.html

app.use(cookieParser());
app.use(cookieSession({
  name: 'session', // The name of the cookie to set, defaults to session.
  keys: ['key1', 'key2'] // The list of keys to use to sign & verify cookie values.
}));

app.get('/', function (req, res, next) {
  // Update views
  console.log('cookies = '+util.inspect(req.cookies));
  console.log('session = '+util.inspect(req.session));
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
})

app.get('/clear', function(req, res, next){
     res.clearCookie('session');
     res.send('Cookie deleted, the number of view is 0 now.');
});

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});
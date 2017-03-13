#Cookie Management in Express 
##What is express?
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.


##How Does Express Look Like?

```javascript
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

##Installation
So far we have seen, what is cookie and how a basic express app would look like. But now I will show you how to acquire cookie abilities in express. The very first thing you would be doing is to install cookie-parser middleware through **npm** into **node_modules** folder which can be found in your app folder. And to install it :

1. Open your terminal,
2. Browse to your app folder,
>$ npm install cookie-parser

##Using Cookie-Parser
Import **cookie-parser** into your app
```javascript
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
```
##Syntax
Cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names. To set a new cookie lets define a new route in your express app like :
```javascript
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});
```
To check whether cookie has been set or not, goto to browser's console and write **document.cookie**.

Browser sends back that cookie to the server, every time when it requests that website. And to get a cookie which a browser might be sending to server by attaching it to request header, we can write following code :
```javascript
app.get('/', function(req, res) {
  console.log("Cookies :  ", req.cookies);
});
```
##How to Set Cookie Expiration Time?
Cookie expire time can be set easily by :
```javascript
res.cookie(name , 'value', {expire : new Date() + 9999});
```
Addition options for cookies can be set be passing an object as argument which carries additional settings for cookies. So, to set expire time to cookies, an object with expire property can be sent which holds the expire time in milliseconds.

An alternate approach to set cookie expiration age is to use optional **magAge** property.
```javascript
res.cookie(name, 'value', {maxAge : 9999});
```
##How to Delete Existing Cookie?
Existing cookies can be deleted very easily using clearCookie method, which accepts the name of the cookie which you want to delete.
```javascript
app.get('/clearcookie', function(req,res){
     clearCookie('cookie_name');
     res.send('Cookie deleted');
});
```
Now, once again you can go and check in browser's console that the particular cookie has been deleted.
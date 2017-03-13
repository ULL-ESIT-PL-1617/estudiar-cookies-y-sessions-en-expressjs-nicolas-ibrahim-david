#Cookie Module
##Installation
>$npm install cookie

##API
```javascript
var cookie = require('cookie');
```

###cookie.parse(str, options)
Parse an HTTP Cookie header string and returning an object of all cookie name-value pairs. The str argument is the string representing a Cookie header value and options is an optional object containing additional parsing options.
```javascript
var cookies = cookie.parse('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' } 
```

###Options
*cookie.parse* accepts these properties in the options object.

###Decode
Specifies a function that will be used to decode a cookie's value. Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to decode a previously-encoded cookie value into a JavaScript string or other object.
The default function is the global *decodeURIComponent*, which will decode any URL-encoded sequences into their byte representations.

###cookie.serialize(name, value, options)
Serialize a cookie name-value pair into a Set-Cookie header string. The name argument is the name for the cookie, the value argument is the value to set the cookie to, and the options argument is an optional object containing additional serialization options.
```javascript
var setCookie = cookie.serialize('foo', 'bar');
// foo=bar 
```

###Options
*cookie.serialize* accepts these properties in the options object.

###domain
Specifies the value for the **Domain Set-Cookie attribute**. By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.

###encode
Specifies a function that will be used to encode a cookie's value. Since value of a cookie has a limited character set (and must be a simple string), this function can be used to encode a value into a string suited for a cookie's value.
The default function is the global ecodeURIComponent, which will encode a JavaScript string into UTF-8 byte sequences and then URL-encode any that fall outside of the cookie range.

###expires
Specifies the Date object to be the value for the Expires Set-Cookie attribute. By default, no expiration is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

###httpOnly
Specifies the *boolean* value for the *[HttpOnly Set-Cookie attribute][rfc-6266-5.2.6]*. When truthy, the **HttpOnly** attribute is set, otherwise it is not. By default, the *HttpOnly* attribute is not set.

###maxAge
Specifies the number (in seconds) to be the value for the **Max-Age Set-Cookie attribute**. The given number will be converted to an integer by rounding down. By default, no maximum age is set.

###path
Specifies the value for the **Path Set-Cookie attribute**. By default, the path is considered the "default path". By default, no maximum age is set, and most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

###sameSite
Specifies the boolean or string to be the value for the SameSite Set-Cookie attribute.

- true will set the SameSite attribute to Strict for strict same site enforcement.
- false will not set the SameSite attribute.
- 'lax' will set the SameSite attribute to Lax for lax same site enforcement.
- 'strict' will set the SameSite attribute to Strict for strict same site enforcement.

###secure
Specifies the boolean value for the [*Secure Set-Cookie attribute][rfc-6266-5.2.5]*. When truthy, the Secure attribute is set, otherwise it is not. By default, the Secure attribute is not set.

##Example
The following example uses this module in conjunction with the *Node.js* core HTTP server to prompt a user for their name and display it back on future visits.
```javascript
var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');
 
function onRequest(req, res) {
  // Parse the query string 
  var query = url.parse(req.url, true, true).query;
 
  if (query && query.name) {
    // Set a new cookie with the name 
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week 
    }));
 
    // Redirect back after setting cookie 
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');
    res.end();
    return;
  }
 
  // Parse the cookies on the request 
  var cookies = cookie.parse(req.headers.cookie || '');
 
  // Get the visitor name set in the cookie 
  var name = cookies.name;
 
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
 
  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }
 
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
}
 
http.createServer(onRequest).listen(3000);
```

##Testing
>$ npm test

##License
[MIT](https://github.com/jshttp/cookie/blob/master/LICENSE)

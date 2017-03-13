/ cookie.js
// https://www.npmjs.com/package/cookie
/*
cookie: a npm module for cookie parsing and serialization
*/

var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');
 
var form = `
<form method="GET">
  <input placeholder="Enter your name" name="name"> 
  <input type="submit" value="Set Name">
</form>
`;

function onRequest(req, res) {
  console.log(req.url);
  // Parse the query string 
  var query = url.parse(req.url, true, true).query;
  console.log(query);
 
  if (query && query.name) { // The input 'name' field was filled
    // Set a new cookie with the name 
    /* 
      The Set-Cookie header is sent by the server in response to
      an HTTP request, which is used to create a cookie on the
      user's system. The Cookie header is included by the client
      application with an HTTP request sent to a server, if there
      is a cookie that has a matching domain and path.
    */
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
    res.write(`<p>Welcome back, <b> ${escapeHtml(name)} </b>!</p>`);
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }
 
  res.write(form);
  res.end();
}
 
http.createServer(onRequest).listen(8080);
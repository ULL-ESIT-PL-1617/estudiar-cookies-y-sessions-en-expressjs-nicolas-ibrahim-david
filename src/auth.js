console.log("HOLA");
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "me" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
// Para hacer login --> http://servidor_local:num_puerto/login?username=me&password=mypassword
// Por ejemplo: http://localhost:8080/login?username=me&password=mypassword
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "me" || req.query.password === "mypassword") {
    req.session.user = "me";
    req.session.admin = true;
    res.send("login success!");
  }
});
 
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
// Si estás logueado, puedes accerder
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
 
app.listen(8080);
console.log("app running at http://localhost:8080");

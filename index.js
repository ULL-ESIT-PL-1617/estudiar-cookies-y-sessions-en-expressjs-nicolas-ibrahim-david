var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/docs'));
app.use(express.static(__dirname + '/_book'));

app.get('/', function(req, res) {
  res.send('Hola Heroku');
});

app.get('/', function(req, res) {
  res.redirect('./index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

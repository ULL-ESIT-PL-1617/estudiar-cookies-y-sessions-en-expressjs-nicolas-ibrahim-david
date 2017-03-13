var express = require('express');
var app = express();

app.use(express.static(__dirname + '/docs'));

app.get('/', function(req, res) {
  res.send('HOME PAGE');
});

app.listen(5000);

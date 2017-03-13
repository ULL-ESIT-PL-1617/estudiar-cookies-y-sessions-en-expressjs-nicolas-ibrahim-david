var express     = require('express');
var app         = express();
var path        = require('path');

process.env.PWD = process.cwd();

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(process.env.PWD, 'public'));

app.use(express.static(path.join(process.env.PWD, 'public')));

app.get('/', function(req, res) {
    res.send('<html><body><a href="_book/index.html">Enlace al libro</a></body></html>');
});

// Escucha de la app
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

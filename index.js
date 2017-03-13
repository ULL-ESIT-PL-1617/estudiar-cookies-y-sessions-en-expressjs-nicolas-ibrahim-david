var express     = require('express');
var app         = express();
var path        = require('path');

process.env.PWD = process.cwd();

app.set('views', path.join(process.env.PWD, 'public'));

app.use(express.static(path.join(process.env.PWD, '_book')));


// Establezco el directorio de trabajo

// Puerto de escucha de la app
app.set('port', (process.env.PORT || 5000));

// Rutas para servir ficheros estaticos
// app.use(express.static(process.env.PWD + '/docs'));
// app.use(express.static(process.env.PWD + '/_book'));
// app.use(express.static(process.env.PWD + '/src'));

// Manejador para la raiz
// app.get('/', function(req, res) {
//   res.send('Hola Heroku');
// });

// Escucha de la app
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

# Introduction
Repositorios usados:
- Gitbook: *https://alu0100898293.gitbooks.io/cookies-ibrahim-david-nicolas/content/*
- Heroku :
*https://git.heroku.com/agile-shelf-51321.git*
- Github : *https://github.com/ULL-ESIT-PL-1617/estudiar-cookies-y-sessions-en-expressjs-nicolas-ibrahim-david*

### Docs
##### Routes
Para esta práctica, podemos acceder al directorio docs mediante la routa en el navegador:
- *localhost:5000/docs/readme*: Envía como respuesta readme.md
- *localhost:5000/docs/summary*: Envía como respuesta summary.md
- *localhost:5000/docs*: Envía como respuesta Docs Page
- *localhost:5000/docs/**: Si ponemos cualquier otra ruta distinta a la anterior, saldrá un error indicando que la ruta es incorrecta.


La implementación de las rutas ha sido declarada en el fichero */routes/docs.js* e importada en el fichero *index.js*.
- El contenido del fichero *docs.js* es el siguiente:

```
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.send('Docs page');
});

router.get('/readme', function(req, res) {
  res.send('readme.md');
});

router.get('/summary', function(req, res) {
  res.send('summary.md');
});

router.get('*', function(req, res) {
  res.send('Error: incorrect route');
});

module.exports = router;
```

- La importación del fichero anterior en el *index.js* está declarada en las siguientes líneas:

```
var docs = require('./routes/docs.js');
app.use('/docs', docs);
```

##### Middleware static
También podemos acceder al directorio docs mediante el uso del middleware static, al declararlo de la siguiente manera en el fichero *index.js*: `app.use(express.static(__dirname + '/docs'));`. En este caso sí que muestra el contenido de los ficheros en formato MarkDown.
Las rutas y los resultados son los siguientes:
- *localhost:5000/readme.md*: Muestra el contenido del fichero readme.md en formato MarkDown.
- *localhost:5000/summary.md*: Muestra el contenido del fichero summary.md en formato MarkDown.
- *localhost:5000/_book* y *localhost:5000/_book/index.html*: Muestra el libro en formato HTML.

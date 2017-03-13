var express = require('express')
  , app = module.exports = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(cookieParser('my secret here'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send(`
      <form method="post">
        <p>Check to 
          <label>
            <input type="checkbox" name="remember"/> remember me
          </label> 
          <input type="submit" value="Submit"/>.
        </p>
      </form>
    `);
  }
});

app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});

app.post('/', function(req, res){
  var minute = 60 * 1000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});


app.listen(8080);
console.log('Express started on port %d', 8080);

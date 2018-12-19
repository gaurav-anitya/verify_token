var express = require('express');
var route=require('./routes/index');
var bodyParser = require('body-parser');
var handlebars   = require('express-handlebars');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(bodyParser());
  var hbs = handlebars.create({  
  });
  app.engine('handlebars', hbs.engine);
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/public',express.static(__dirname + '/public'));
app.use('/',route);
 
app.listen(8083);
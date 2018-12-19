var express = require('express'); 
const router = express.Router();

var visiter=require('./VisiterEntry');

router.get('/', function(req, res){
  //console.log("Hello");
  res.render('Login', {layout: false});
  
});

router.use('/',visiter);
  

module.exports=router;
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const app = express.Router();
var sessionstorage = require('sessionstorage');
var session = require('express-session')
var flash = require('req-flash');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser('keyboard cat'));
  app.use(session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
  
var mysql = require('mysql');
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = 'Onboarding';


var con = mysql.createConnection({
host: HOST,
port: PORT,
user: MYSQL_USER,
password: MYSQL_PASS,
database: DATABASE
});

con.connect(function(err) {
  console.log(err);
if (err) throw err;
console.log("Connected!");
con.query("Select * from VisiterRecord", function (err, result) {
  if (err) throw err;
  //console.log(result);
});
});


// app.post("/getApprovalToken",function(req, res) {
// console.log(req.body);

// res.send(approvalToken(req.body.escort_id));
// });

app.post("/verifyApprovalToken",function(req, res) {
  var actualToken=req.body.token_key.split("");
  var resultedToken="";
  for(var num=1; num < actualToken.length-2; num++ )
  {
    
    resultedToken=resultedToken+actualToken[num].toString();
  }

  var approverMasking = approvalToken(resultedToken);
  
  console.log(approverMasking);
  var timestamp=Math.floor(Date.now() / 1000);
  console.log("timestamp: "+timestamp);
   
   var val=Math.floor(Math.random() * 10);
   var val1=Math.floor(Math.random() * 10);
  //var val = Math.floor(1000 + Math.random() * 9000);
  //var getId="select Role_Id from login_table where userId= 'Sumesh'"
          con.query("select Role_Id from login_table where userId=?",[req.body.userName], function (err, result) {
            if (err) 
              throw err;

            else if(result.length>0)
            {  
              var str=result[0].Role_Id;
              console.log("approver:"+str);
              var token= approverMasking+val+val1;
              console.log(token);
              console.log(str+""+token);
              res.send(str+""+token);
            }
            else{
              res.send(false);
            }
              //console.log(result[0]);
          });
  //res.send(approverMasking(req.body.token_key,req.body.userName));
  //console.log("end");
  });




    
    app.post("/login",function(req, res) {
          console.log("enter");
          var userId=req.body.userId;
          var pass=req.body.password;
          console.log(pass);
         // var getId="select * from login_table where userId=? and password=? ";
          con.query("select * from login_table where userId=? and password=? ",[userId,pass], function (err, result) {
            if (err) 
              throw err;
            else if(result.length >0)
            { 
              sessionstorage.setItem("userName", req.body.userId);
              res.render('ApprovalToken', {layout: false});
            }
            else{
              console.log("error");
              //req.flash('info', 'Flash is back!');
              res.render('Login', {info:"Invalid username or password!!"});
              
            }
            console.log(result);
          });


          });

function approvalToken(id){
  //console.log("access token");
var key0="8";
var key1="2";
var key2="5";
var key3="4";
var key4="1";
var key5="6";
var key6="0";
var key7="3";
var key8="9";
var key9="7";

var mod=0;
var token="";
var tempId=id;

for(var temp=0; temp < id.length; temp++)
{
    mod=tempId % 10;
    tempId=tempId/10;
    tempId=Math.floor(tempId);

    if(mod == 0)
    token=token+key0;
    else if(mod==1)
    token=token+key1;
    else if(mod==2)
    token=token+key2;
    else if(mod==3)
    token=token+key3;
    else if(mod==4)
    token=token+key4;
    else if(mod==5)
    token=token+key5;
    else if(mod==6)
    token=token+key6;
    else if(mod==7)
    token=token+key7;
    else if(mod==8)
    token=token+key8;
    else if(mod==9)
    token=token+key9;
}

return token;

}

function approverMasking(token,userName){

  var approverMasking = approvalToken(token);
  console.log(userName);
  console.log(approverMasking);
  var val=Math.floor(Math.random() * 10);
  var val1=Math.floor(Math.random() * 10);
  //var val = Math.floor(1000 + Math.random() * 9000);
  var getId="select Role_Id from login_table where userId= 'Sumesh'"
          con.query("select Role_Id from login_table where userId=?",[userName], function (err, result) {
            if (err) 
              throw err;
              var str=result[0].Role_Id;
              console.log("approver:"+str);
              var token= val1+approverMasking+val;
              console.log(token);
              console.log(str+ token);
              return str+ token;
              //console.log(result[0]);
          });

}




module.exports=app;


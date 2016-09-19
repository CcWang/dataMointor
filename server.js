var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path=require('path');
var mysql = require('mysql');
// connect with mysql
var connection=mysql.createConnection({
  host:'127.0.0.1',
  port:'8889',
  user:'root',
  password:'root',
  database:'testing'
});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./client')));
app.set('views',path.join(__dirname,'./client'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
  res.render('index')
});
app.listen(8000, function(){
  console.log('your are listening on port 8000 now');
});
connection.connect(function(err){
  if(err){
    console.log('error connecting:'+err.stack);
    return;
  }
  console.log('connecd as id'+ connection.threadId);
})
// route and query
app.get('/users',function(req,res){
  connection.query('select * from times',function(err,rows){
    res.render('index',{users:rows});
  })

});
app.post('/sqltime',function(req,res){
  connection.query('select * from time',function(err,rows){
    // console.log(rows)
    res.send(rows);
  })
})

// creating fake data
// setInterval(createData,1000);
// needed schema: x: timestamp, on xAxis need to be human readable, on yAxis, number less than 1000, metadata
 function createData (){
  var timeNow = new Date();
  var timing = {'date':timeNow.getDate(),'hour':timeNow.getHours(),'min':timeNow.getMinutes(),'sec':timeNow.getSeconds()};
  connection.query('insert into time SET ? ',timing,function(err,rows){
    if(err){
      console.log(err)
    }
  });
};

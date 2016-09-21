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
 function dataOne (){
  var timeNow = new Date().getTime();
  var y = Math.random()*1000;
  console.log ('one',timeNow)
  // var timing = {'timestamp':timeNow,'data':Math.random()*1000};
  // connection.query('insert into serverOne SET ? ',timing,function(err,rows){
  //   if(err){
  //     console.log(err)
  //   }
  // });
  var query = "insert into serverOne (timestamp,data) VALUES (FROM_UNIXTIME(timeNow,'%Y-%D-%M %h:%i:%s'),y)";
  connection.query(query,function(err,rows){
    if(err){
      console.log(err)
    }
  });
};
//  function dataTwo (){
//   var timeNow = new Date().getTime();
//   console.log ('two',timeNow)
//   var timing = {'timestamp':FROM_UNIXTIME(timeNow,'%Y-%D-%M %h:%i:%s'),'data':Math.random()*1000};
//   connection.query('insert into serverTwo SET ? ',timing,function(err,rows){
//     if(err){
//       console.log(err)
//     }
//   });
// };
 function dataThree (){
  var timeNow = new Date().getTime();
  console.log ('three',timeNow)
  var timing = {'timestamp':timeNow,'data':Math.random()*1000};
  connection.query('insert into serverThree SET ? ',timing,function(err,rows){
    if(err){
      console.log(err)
    }
  });
};
setInterval(function(){
  dataOne();
  
  dataThree();
   // var timeNow = new Date().getTime();
   // console.log (timeNow)
},36000)


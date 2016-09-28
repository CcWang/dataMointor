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

app.post('/dataOne',function(req,res){
  connection.query('select timeStamp,data,metadata,threedata from serverOne',function(err,rows){
    var data = {
      'one':[],
      'two':[],
      'three':[],
      'timestamp':[]
    };
    for(var i=0;i<rows.length;i++){
      // console.log(rows[i]["data"])
      data['one'].push(rows[i]["data"]);
      data['two'].push(rows[i]['metadata']);
      data['three'].push(rows[i]['threedata']);
      var day = new Date(rows[i]['timeStamp']);
      // console.log(day.getMintues());
      var dateFormat = day.getFullYear() + '-'+ day.getMonth()+"-"+day.getDate()+' '+ day.getHours()
      +":"+day.getMinutes()+':'+day.getSeconds();
      data['timestamp'].push(dateFormat);

    }
    res.send(data);
  })
})
// check newly added data

// creating fake data
// setInterval(createData,1000);
// needed schema: x: timestamp, on xAxis need to be human readable, on yAxis, number less than 1000, metadata
 function dataOne (){
  var timeNow = Math.floor((new Date())/1000);
  var y = Math.random()*1000;
  console.log ('time Now',timeNow)

  var queryOne = "insert into serverOne (timestamp,data, metadata,threedata) VALUES (FROM_UNIXTIME("+timeNow+",'%Y-%m-%d %H:%M:%S'),"+Math.random()*1000+","+Math.random()*1000+","+Math.random()*1000+")";
  
  connection.query(queryOne,function(err,rows){
    if(err){
      console.log(err)
    }
  });
};  

// setInterval(function(){
//   dataOne();

// },3600)

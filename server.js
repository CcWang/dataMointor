var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path=require('path');
var mysql = require('mysql');
var lastId;
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
  connection.query('select * from serverOne',function(err,rows){
    lastId=rows[rows.length-1]['id'];
    console.log('dataOne',lastId)
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
      var dateFormat = day.getFullYear() + '-'+ day.getMonth()+"-"+day.getDate()+' '+ day.getHours()
      +":"+day.getMinutes()+':'+day.getSeconds();
      data['timestamp'].push(dateFormat);

    }
    res.send(data);
  })
})
// check newly added data
app.post('/checkData',function(rep,res){
  console.log('last id',lastId);
  if(lastId !== undefined){
    var checkData='select * from serverOne where id >' + lastId;
    connection.query(checkData,function(err,rows){
      if(err){
        console.log('error query',err.stack);
      }else if(rows.length > 0){
        // sending the data 

        lastId = rows[rows.length-1]['id'];
        var data={
          'one':[],
          'two':[],
          'three':[],
          'timestamp':[]
        };
        for(var i=0;i<rows.length;i++){
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
      }else{
        var msg = false;
        res.send(msg)
      }
    })
    
  }else{
    return;
  }
})
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

setInterval(function(){
  dataOne();

},3600)

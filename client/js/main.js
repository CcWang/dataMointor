$(document).ready(function(){
  // start highcharts
  $('#container').highcharts({
    chart:{
      type:'area',
      events:{
        load:function(){
          // var i=11
          $.post('/sqltime',function(data){
          var charts = $('#container').highcharts();
            var s1=charts.series[0];
            var s2=charts.series[1];
            var i=11;
            setInterval(function(){
              s1.addPoint([i,data[i]['mins']],true,true,true);
              s2.addPoint([i,data[i]['hour']],true,true,true);
              i+=1;
            },1000);
          });
        }
      }
    },
    title:{
      text:'time stack'
    },
    xAxis:{
      // categories:(function(){
      //   var data=[];
      //   for(var i=1;i<62;i+=9){
      //     data.push(i);
      //   };
      //   return data;
      // }()),
      tickmarkPlacement:'on'
    },
    yAxis:{
      title:{
        text:'Numbers'
      }
    },
    plotOptions:{
      area:{
        stacking:'normal'
      }
    },
    series: [{
            name: 'date/sec',
            data: [[8,01],[9,24],[10,16]]
        }, {
            name: 'hours/min',
            data: [[8,24],[9,27],[10,8]]
        }],

    credits:{
      enabled:false
    },
    exporting:{
      buttons:{
    		exportButton:{
    			enabled:false
    		},
    		contextButton:{
    			enabled:false
    		},
    		printButton:{
    			enabled:false
    		}
    	}
    }
  });
  // end of highcharts

  // get data from SQL
  $.post('/sqltime',function(data){
    var dates={
      "date":[],
      "hours":[],
      "mins":[],
      "secs":[]
    };
    for(var i=1;i<11;i++){
      dates['date'].push(data[i]['date']);
      dates['hours'].push(data[i]['hour']);
      dates['mins'].push(data[i]['min']);
      dates['secs'].push(data[i]['sec']);
    }
    var chart = $('#container').highcharts();
    // chart.series[0].update({
		//  		data:dates['date']
		//  });
    //  chart.series[1].update({
    //     data:dates['hours']
    //  });
    //  chart.series[2].update({
    //     data:dates['mins']
    //  });
    //  chart.series[3].update({
    //     data:dates['secs']
    //  });
  });
})

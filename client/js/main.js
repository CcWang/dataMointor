$(document).ready(function(){
  // start highcharts
  $('#container').highcharts({
    chart:{
      type:'line',
      animation: Highcharts.svg,
      events:{
        load:function(){
          // var i=11
          $.post('/sqltime',function(data){
          var charts = $('#container').highcharts();
            var d=charts.series[0];
            var h=charts.series[1];
            var m=charts.series[2];
            var s=charts.series[3];
            var y=Math.random();
            for(var i=11;i<data.length;i++){
              console.log(data[i]['date'])
              setInterval(function(){
                // console.log(data[i])
                // d.addPoint([data[i]['date']],true,true);
                // h.addPoint([data[i]['hour']],true,true);
                // m.addPoint([data[i]['min']],true,true);
                // s.addPoint([data[i]['sec']],true,true);

              },1000);
            }
          });
        }
      }
    },
    title:{
      text:'time stack'
    },
    xAxis:{
      categories:(function(){
        var data=[];
        for(var i=1;i<62;i+=9){
          data.push(i);
        };
        return data;
      }()),
      tickmarkPlacement:'on'
    },
    yAxis:{
      title:{
        text:'Numbers'
      },
      labels:{
        formatter:function(){
          return this.value
        }
      }
    },
    plotOptions:{
      area:{
        stacking:'normal'
      }
    },
    series: [{
            name: 'date',
            data: [8,8,8,8,8,8,8]
        }, {
            name: 'hours',
            data: [10,11,12,13,14,15,16]
        }, {
            name: 'min',
            data: [24,27,8,19,34,35,54]
        }, {
            name: 'sec',
            data: [01,24,16,58,38,40,50]
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
    chart.series[0].update({
		 		data:dates['date']
		 });
     chart.series[1].update({
        data:dates['hours']
     });
     chart.series[2].update({
        data:dates['mins']
     });
     chart.series[3].update({
        data:dates['secs']
     });
  });
})

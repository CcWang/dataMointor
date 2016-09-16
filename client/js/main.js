$(document).ready(function(){
  // start highcharts
  $('#container').highcharts({
    chart:{
      type:'area',
      events:{
        load:function(){
          var chart=this;
          var s1=this.series[0];
          var s2=this.series[1];
          var s3=this.series[2];
          var x=125
          console.log(s1,s2,s3);
          setInterval(function(){
            var y1=Math.random()*98+Math.random()*50;
            s1.addPoint([x,y1],false,true);
            s2.addPoint([x,y1],false,true);
            s3.addPoint([x,y1],false,true);
            chart.redraw();
            x+=1;
          },1000)
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
            name: 'texting one',
            data: (function(){
              var data=[];
              for (var i=100;i<125;i++){
                data.push([i,(Math.random()*100+50)]);
              }
              return data
            })()

        }, {
            name: 'testing two',
            data: (function(){
              var data=[];
              for (var i=100;i<125;i++){
                data.push([i,(Math.random()*100+50)]);
              }
              return data;
            })()
        },{
          name:'testing three',
          data:(function () {
            var data=[];
            for (var i=100;i<125;i++){
              data.push([i,(Math.random()*100+50)]);
            }
            return data
          })()
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

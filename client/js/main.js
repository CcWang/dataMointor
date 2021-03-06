$(document).ready(function(){
  // start highcharts
function bindData(serName){
    $.post(serName,function(data){
      return data['y'];
    })
  };
  $('#container').highcharts({
    chart:{
      type:'area',
      events:{
        load:function(){
          var chart = this;
          var s1=this.series[0];
          var s2=this.series[1];
          var s3=this.series[2];
          setInterval(function(){
            $.post('./checkData',function(data){
              if(data){
                for(var i=0;i<data['timestamp'].length;i++){
                  s1.addPoint([data['timestamp'][i],data['one'][i]],false,true);
                  s2.addPoint([data['timestamp'][i],data['two'][i]],false,true);
                  s3.addPoint([data['timestamp'][i],data['three'][i]],false,true);
                  chart.redraw();
                }
              }

            })
            
          },3600)
        }
      }
    },
    title:{
      text:'time stack'
    },
    xAxis:{
      type:'datetime',
      tickmarkPlacement:'on'
    },
    yAxis:{
      title:{
        text:'Numbers'
      }
    },
    plotOptions:{
      area:{
        stacking:'normal',
        marker:{
          enable:false
          
        }
      }
    },
    series: [{
            name: 'texting one',
            data: []
        },{
            name:'texting two',
            data:[]
        },{
            name:'texting three',
            data:[]
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
  $.post('/dataInit',function(data){
    var chart = $('#container').highcharts();
    chart.series[0].update({
      data:data['one']
    });   
    chart.series[1].update({
      data:data['two']
    });
    chart.series[2].update({
      data:data['three']
    });
    chart.xAxis[0].setCategories(
      data['timestamp']
    )
  });

})

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
    //       var chart=this;
    //       var s1=this.series[0];
    //       var s2=this.series[1];
    //       var s3=this.series[2];
    //       var x=125
    //       console.log(s1,s2,s3);
    //       setInterval(function(){
    //         var y1=Math.random()*98+Math.random()*50;
    //         s1.addPoint([x,y1],false,true);
    //         s2.addPoint([x,y1],false,true);
    //         s3.addPoint([x,y1],false,true);
    //         chart.redraw();
    //         x+=1;
    //       },1000)
          setInterval(function(){
            $.post('./checkData',function(data){
              console.lod(data);
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
        stacking:'normal'
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
  $.post('/dataOne',function(data){
    var chart = $('#container').highcharts();
    console.log(data['timestamp'])
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

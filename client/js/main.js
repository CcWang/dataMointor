$(document).ready(function(){
  $('#container').highcharts({
    chart:{
      type:'area'
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
  })
})

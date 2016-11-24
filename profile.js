/**
 * Created by Administrator on 2016/11/21.
 */



$(document).ready(function () {
    var data = [];

    $.ajax({
        url:"http://202.117.15.156:8080/silkRoad2/user_info",
        async:false,
        success:function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t =jsonData[i].res_type;
                data=[{name:"News",value:t.News},{name:"Paper",value:t.Paper},
                    {name:"Ebook",value:t.Ebook},{name:"Patent",value:t.Patent},{name:"Conference",value:t.Conference}];
            }
        }
    });
    // $.getJSON("http://202.117.15.156:8080/silkRoad2/user_info", function (jsonData) {
    //     for (var i = 0; i < jsonData.length; i++) {
    //         var t =jsonData[i].res_type;
    //         data=[{name:"News",value:t.News},{name:"Paper",value:t.Paper},
    //             {name:"Ebook",value:t.Ebook},{name:"Patent",value:t.Patent},{name:"Conference",value:t.Conference}];
    //     }
    //     // for (var i = 0;i<data.length;i++){
    //     //     alert(data[i].name+"     "+data[i].value);
    //     // }
    // });

    require.config({
        paths: {
            echarts: './build/dist/'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            'echarts/chart/pie' // 使用柱状图就加载line模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('pie'));
            var myChart2 = ec.init(document.getElementById('bar'));
            option = {
                title: {
                    text: 'Number of visiting the type of sources',
                    //    subtext: '纯属虚构',
                    x: 'right'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['News', 'Paper', 'Ebook', 'Patent', 'Conference']
                },
                calculable: true,
                series: [
                    {
                        name: 'type of source',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', "60%"],
                        // itemStyle: {
                        //     normal: {
                        //         label: {
                        //             show: true, position: 'outer',
                        //             formatter: '{b} :{d}%'
                        //         }
                        //     }
                        // },
                        data:data
                    }
                ]
            };

            // var dataAxis = ['1', 'ffqweqf', '3', '4', '5'];
            var dataAxis = ['News', 'paper', 'Ebook', 'Patent', 'Conf..'];
            var data4 = [];
            for (var i = 0;i<data.length;i++){
                data4[i]=data[i].value;
            }
            var yMax = 500;
            var dataShadow = [];

            for (var i = 0; i < data4.length; i++) {
                dataShadow.push(yMax);
            }

            option2 = {
                title : {
                    text: 'Number of visiting the type of sources',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },

                calculable : true,
                xAxis : [
                    {   name : 'category',
                        type : 'category',
                        data:dataAxis
                    }
                ],
                yAxis : [
                    {   name:'number',
                        type : 'value'
                    }
                ],
                series : [

                    {
                        name:"number",
                        type:"bar",
                        itemStyle: {
                            normal: {
                                label : {
                                    show: true, position: 'top'
                                },
                                color: '#6495ED'
                            }
                        },
                        data:data4
                    }

                ]
            };

// Enable data zoom when user click bar.
            var zoomSize = 6;
            myChart.on('click', function (params) {
                console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                });
            });

            myChart.setOption(option);
            myChart2.setOption(option2);

            myChart.connect(myChart2);
            myChart2.connect(myChart);

            setTimeout(function () {
                window.onresize = function () {
                    myChart.resize();
                    myChart2.resize();
                }
            }, 200)

        }
    );
});

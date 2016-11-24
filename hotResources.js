/**
 * Created by Administrator on 2016/11/23.
 */
$(document).ready(function () {
    var data = [];

    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/user_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i].res_type;
                data = [{name: "News", value: t.News}, {name: "Paper", value: t.Paper},
                    {name: "Ebook", value: t.Ebook}, {name: "Patent", value: t.Patent}, {
                        name: "Conference",
                        value: t.Conference
                    }];
            }
        }
    });

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
            var myChart = ec.init(document.getElementById('res'));
            option = {
                title: {
                    text: 'Number of visiting the type of sources',
                    //    subtext: '纯属虚构',
                    x: 'center'
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
                        data: data
                    }
                ]
            };

            // var dataAxis = ['1', 'ffqweqf', '3', '4', '5'];
            var dataAxis = ['News', 'paper', 'Ebook', 'Patent', 'Conf..'];
            var data4 = [];
            for (var i = 0; i < data.length; i++) {
                data4[i] = data[i].value;
            }
            var yMax = 500;
            var dataShadow = [];

            for (var i = 0; i < data4.length; i++) {
                dataShadow.push(yMax);
            }


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
            setTimeout(function () {
                window.onresize = function () {
                    myChart.resize();
                }
            }, 200)

        }
    );
    // HotNewsList create by cc email: chen10_09@qq.com;
    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/news_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i];
                var image_url = t.imageUrl;
                var newsDate = t.date.substr(0, 11);
                var newsTitle = t.title;
                var url = t.url;

                var u1 = '<div style="broder-style:solid; broder-color:#000;width: 100%;height: 70px;margin-top: 20px">' +
                    '<div style="float: left;">' +
                    '<img style="width: 90px;height: 60px;" src="' + image_url + '">' +
                    '</div>' +
                    '<div style="position: relative;;width: 350px;height: 70px;float: left;margin-left: 10px;word-break: break-word">' +
                    '<p><a href="' + url + '"><strong style="font-size: 14px; color: #00adef">' + newsTitle + '</strong></a></p>' +
                    '<p style="font-size: 12px; color: #999;position: absolute;bottom: 8px;">' + newsDate + '</p>' +
                    '</div>' +
                    '</div>' +

                    '<hr style="width: 400px;margin-bottom: 10px; height:1px;border:none;border-top:1px dashed #CCCCCC;">';
                $(".newslist").append(u1);
            }
        }
    });

    // HotEbookList create by cc email: chen10_09@qq.com;
    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/ebook_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i];
                var image_url = t.img_url;
                var year = t.year;
                var author = t.author;
                var pages = t.pages;
                //The language should be start with a capital(upperCase) letter
                var language = t.language.replace(/(\w)/, function (v) {
                    return v.toUpperCase()
                });
                var ebookTitle = t.title;
                var url = t.url;
                var publisher = t.publisher;

                var u1 = '<div style="broder-style:solid; broder-color:#000;width: 100%;height: 130px;margin-top: 20px">' +
                    '<div style="float: left;">' +
                    '<img style="width: 75px;height: 110px;" src="' + image_url + '">' +
                    '</div>' +
                    '<div style=" position: relative;width: 350px;height: 130px;float: left;margin-left: 10px;word-break: break-word">' +
                    '<p><a href="' + url + '"><strong style="font-size: 14px; color: #00adef">' + ebookTitle + '</strong></a></p>' +
                    '<p style="font-size: 12px; color: #999">Author: ' + author + '</p>' +
                    '<div style="position: absolute;bottom: 20px;"><span style="margin-right: 100px">Language: ' + language + '</span><span>Publisher: ' + publisher + '</span></div>' +
                    '<div style="position: absolute;bottom: 40px;"><span style="margin-right: 144px">Year: ' + year + '</span><span>Pages:' + pages + '</span></div>' +
                    '</div>' +
                    '</div>' +
                    '<hr style="width: 430px;margin-bottom: 10px; height:1px;border:none;border-top:1px dashed #CCCCCC;">';
                $(".ebooklist").append(u1);
            }
        }
    });

    // HotPatentList create by cc email: chen10_09@qq.com;
    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/patent_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i];
                var patent_number = t.patent_number;
                var assignee_name = t.assignee_name;
                var title = t.title;
                var url = t.url;
                var inventor = t.inventor;

                var u1 = '<div style="position: relative;;broder-style:solid; broder-color:#000;width: 100%;height: 130px;margin-top: 20px">' +
                    '<div><strong style="line-height:19px;font-size:13px;">' +
                    patent_number + '</strong></div>' +
                    '<div style="width: 430px;height: 70px;margin-left: 10px;word-break: break-word">' +
                    '<p><a style="font-size: 14px; color: #00adef" href="' + url + '">' + title + '</a></p>' +

                    '<div style="position: absolute;bottom: 5px;">' +
                    '<p style="font-size: 12px; color: #999">Assignee Name: ' + assignee_name + '</p>' +
                    '<p style="font-size: 12px; color: #999">Inventor: ' + inventor + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<hr style="width: 430px;margin-bottom: 10px; height:1px;border:none;border-top:1px dashed #CCCCCC;">';
                $(".patentlist").append(u1);
            }
        }
    });

    // HotPaperList create by cc email: chen10_09@qq.com;
    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/paper_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i];
                var volume = t.volume;
                var year = t.year;
                var doi = t.doi;
                var summary = t.summary.substr(0, 150) + '...';
                var title = t.title;
                var url = t.url;

                var u1 = '<div style="broder-style:solid; broder-color:#000;width: 100%;height: 130px;margin-top: 20px">' +
                    '<div style="width: 400px;height: 130px;float: left;margin-left: 10px;word-break: break-word">' +
                    '<p><a href="' + url + '"><strong style="font-size: 14px; color: #00adef">' + title + '</strong></a></p>' +
                    '<p style="font-size: 12px; color: #999"><span style="margin-right: 80px">' + doi + '</span><span>Year: ' + year + '</span></p>' +
                    '<div style="margin-top: 10px"> <p>' + summary + '</p></div>' +
                    '</div>' +
                    '</div>' +

                    '<hr style="width: 430px;margin-bottom: 10px; height:1px;border:none;border-top:1px dashed #CCCCCC;">';
                $(".paperlist").append(u1);
            }
        }
    });

    // HotConferenceList create by cc email: chen10_09@qq.com;
    $.ajax({
        url: "http://202.117.15.156:8080/silkRoad2/conf_info",
        async: false,
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var t = jsonData[i];
                var onganizer = t.onganizer;
                var start_time = t.start_time;
                var broad_theme = t.broad_theme;
                var title = t.title;
                var url = t.url;

                var u1 = '<div style="broder-style:solid; broder-color:#000;width: 100%;height: 130px;margin-top: 20px">' +
                    '<div style="position: relative;width: 420px;height: 130px;float: left;margin-left: 10px;word-break: break-word">' +
                    '<p><a href="' + url + '"><strong style="font-size: 14px; color: #00adef">' + title + '</strong></a></p>' +
                    '<p style="font-size: 13px; color: #00adef;">' + broad_theme + '</p>' +
                    '<p style="font-size: 12px; color: #999;position: absolute;bottom: 35px;">Organizer: ' + onganizer + '</p>' +
                    '<p style="font-size: 12px; color: #999;position: absolute;bottom: 15px;">Start time: ' + start_time + '</p>' +
                    '</div>' +
                    '</div>' +

                    '<hr style="width: 430px;margin-bottom: 10px; height:1px;border:none;border-top:1px dashed #CCCCCC;">';
                $(".conferencelist").append(u1);
            }
        }
    });
});
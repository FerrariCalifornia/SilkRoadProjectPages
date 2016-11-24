/**
 * Created by Administrator on 2016/11/19.
 */
!function (t) {
    function e(i) {
        if (n[i])return n[i].exports;
        var o = n[i] = {exports: {}, id: i, loaded: !1};
        return t[i].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }

    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function (t, e, n) {
    t.exports = n(2)
}, , function (module, exports) {
    function _clearTimeTickers() {
        for (var t = 0; t < _intervalIdList.length; t++)clearInterval(_intervalIdList[t]);
        for (var t = 0; t < _timeoutIdList.length; t++)clearTimeout(_timeoutIdList[t]);
        _intervalIdList = [], _timeoutIdList = []
    }

    function _wrapEChartsSetOption(t) {
        var e = t.setOption;
        t.setOption = function () {
            var n = e.apply(t, arguments);
            return _windowTopOrigin && window.top.postMessage({
                action: "optionUpdated",
                computedOption: JSON.stringify(t.getOption())
            }, _windowTopOrigin), n
        }
    }

    function _wrapOnMethods(t) {
        var e = t.on;
        t.on = function (n) {
            var i = e.apply(t, arguments);
            return _events.push(n), i
        }
    }

    function _clearChartEvents() {
        _events.forEach(function (t) {
            if (myChart)myChart.off(t); else for (var e = 0; e < myCharts.length; ++e)myCharts[e].off(t)
        }), _events.length = 0
    }

    function updateConfigGUI() {
        if (gui && ($(gui.domElement).remove(), gui.destroy(), gui = null), app.config) {
            gui = new dat.GUI({autoPlace: !1}), $(gui.domElement).css({
                position: "absolute",
                right: 5,
                top: 0,
                zIndex: 1e3
            }), $("#chart-panel").append(gui.domElement);
            var t = app.configParameters || {};
            for (var e in app.config) {
                var n = app.config[e];
                if ("onChange" !== e && "onFinishChange" !== e) {
                    var i = !1, o = null;
                    if (t[e] && (t[e].options ? o = gui.add(app.config, e, t[e].options) : null != t[e].min && (o = gui.add(app.config, e, t[e].min, t[e].max), null != t[e].step && o.step(t[e].step))), "string" == typeof n)try {
                        var a = echarts.color.parse(n);
                        i = !!a, i && (n = echarts.color.stringify(a, "rgba")), app.config[e] = n
                    } catch (r) {
                    }
                    o || (o = gui[i ? "addColor" : "add"](app.config, e)), app.config.onChange && o.onChange(app.config.onChange), app.config.onFinishChange && o.onFinishChange(app.config.onFinishChange)
                }
            }
        }
    }

    var _originWhiteList = ["http://gallery.echartsjs.com", "http://127.0.0.1:3000", "http://echarts.duapp.com"], myChart = null, myCharts = [];
    $(document).ready(function () {
        function t(t) {
            var e = t.data, n = e.action;
            __actions__[n] && __actions__[n](e)
        }

        window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t), __actions__.create()
    });
    var app = {}, gui, _intervalIdList = [], _timeoutIdList = [], _oldSetTimeout = window.setTimeout, _oldSetInterval = window.setInterval, _windowTopOrigin = "";
    window.setTimeout = function (t, e) {
        var n = _oldSetTimeout(t, e);
        return _timeoutIdList.push(n), n
    }, window.setInterval = function (t, e) {
        var n = _oldSetInterval(t, e);
        return _intervalIdList.push(n), n
    };
    var _events = [], __actions__ = {
        useOrigin: function (t) {
            _originWhiteList.indexOf(t.origin) >= 0 && (_windowTopOrigin = t.origin)
        }, resize: function () {
            myChart && myChart.resize();
            for (var t = 0; t < myCharts.length; ++t)myCharts[t].resize();
            _windowTopOrigin && window.top.postMessage({action: "afterResize"}, _windowTopOrigin)
        }, create: function (t) {
            if (t) {
                myChart && myChart.dispose(), myChart = null, $("#chart-panel").html("");
                for (var e = 0; e < myCharts.length; ++e)myCharts[e] && myCharts[e].dispose();
                myCharts = [];
                var n = t;
                if (window.__currentLayout__ && window.__layoutCustomized__)n = window.__layoutWidth__.length * window.__layoutHeight__.length; else if (window.__layoutWidth__ = [], window.__layoutHeight__ = [], "1xN" === window.__currentLayout__) {
                    for (var e = 0; e < n; ++e)window.__layoutWidth__.push(100 / n + "%");
                    window.__layoutHeight__.push("100%")
                } else if ("NxM" === window.__currentLayout__) {
                    for (var i = Math.ceil(Math.sqrt(n)), e = 0; e < i; ++e)window.__layoutWidth__.push(100 / i + "%");
                    for (var o = Math.ceil(n / i), e = 0; e < o; ++e)window.__layoutHeight__.push(100 / o + "%")
                } else {
                    window.__layoutWidth__.push("100%");
                    for (var e = 0; e < n; ++e)window.__layoutHeight__.push(100 / n + "%")
                }
                t < n && console.warn("部分图表没有对应的布局项，因而未被显示。");
                for (var a = 0, r = 0; r < window.__layoutHeight__.length; ++r)for (var s = 0; s < window.__layoutWidth__.length && !(a >= t); ++s) {
                    var h = $('<div style="width: ' + window.__layoutWidth__[s] + "; height: " + window.__layoutHeight__[r] + '; float: left; display: inline-block"></div>');
                    $("#chart-panel").append(h);
                    var p = echarts.init(h[0], window.__currentTheme__);
                    _wrapEChartsSetOption(p), _wrapOnMethods(p), myCharts.push(p), ++a
                }
            } else myChart && myChart.dispose(), myChart = echarts.init($("#chart-panel")[0], window.__currentTheme__), _wrapEChartsSetOption(myChart), _wrapOnMethods(myChart)
        }, run: function (data) {
            _clearTimeTickers(), _clearChartEvents(), app.config = null;
            var __err__, option, options;
            try {
                eval(data.code), updateConfigGUI()
            } catch (e) {
                option = myChart.getModel() ? null : {series: []}, __err__ = e.toString()
            }
            if (option)myChart.setOption(option, !0); else if (options) {
                options.length !== myCharts.length && __actions__.create(options.length);
                for (var i = 0; i < myCharts.length; ++i)options[i] && myCharts[i].setOption(options[i])
            }
            _windowTopOrigin && window.top.postMessage({
                action: "afterRun",
                error: __err__,
                chartCnt: myChart ? 1 : myCharts.length
            }, _windowTopOrigin)
        }, prepareChartDetail: function (t) {
            var e = document.createElement("canvas");
            e.width = 800, e.height = 600;
            var n = document.createElement("canvas");
            n.width = 400, n.height = 300;
            var i = n.getContext("2d"), o = echarts.init(e), a = myChart ? myChart.getOption() : myCharts[0].getOption(), r = myChart ? myChart.getModel() : myCharts[0].getModel(), s = r.getComponent("title"), h = [], p = ["markLine", "markPoint", "markArea", "series", "xAxis", "yAxis", "angleAxis", "radiusAxis", "parallelAxis"];
            for (var _ in a)p.indexOf(_) < 0 && r.getComponent(_) && ("grid" === _ && r.getComponent("xAxis") && r.getComponent("yAxis") || "grid" !== _) && h.push({
                type: "component",
                value: _
            });
            var l = {};
            r.eachComponent("series", function (t) {
                var e = t.subType;
                l[e] || (l[e] = !0, h.push({type: "chart", value: e}))
            });
            var d = {};
            if (r.eachComponent("series", function (t) {
                    ["markPoint", "markLine", "markArea"].forEach(function (e) {
                        t.get(e, !0) && !d[e] && (h.push({type: "component", value: e}), d[e] = !0)
                    })
                }), a.timeline && a.timeline.length) {
                var c = a.timeline[0];
                c.currentIndex = 0, a.timeline = null;
                var u = {timeline: c, options: []};
                a.animation = !1;
                for (var g = 0; g < c.data.length; g++)u.options.push(a);
                a = u
            }
            a.animation = !1, a.series && a.series.forEach(function (t) {
                "graph" === t.type && "force" === t.layout && (t.force = t.force || {}, t.force.layoutAnimation = !1), t.progressive = 0, t.progressiveThreshold = 1 / 0
            });
            var m;
            try {
                o.setOption(a, !0), i.drawImage(e, 0, 0, n.width, n.height), m = n.toDataURL()
            } catch (w) {
                console.error(w), m = ""
            }
            _windowTopOrigin && window.top.postMessage({
                onlyScreenshot: t.onlyScreenshot,
                action: "afterPrepared",
                echartsVersion: echarts.version,
                title: s && s.get("text") || "",
                description: s && s.get("subtext") || "",
                tags: h,
                thumbUrl: m
            }, _windowTopOrigin)
        }
    }
}]);
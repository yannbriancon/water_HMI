/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function d3Panel(waters, countries, error){
    //Add the countries in the selection list
    d3.selectAll("#select_country").selectAll()
            .data(countries)
            .enter()
            .append("option")
            .attr("value", function(d) {
                return String(d['waterId']);   
            })
            .html(function(d) {
                return d['country']; 
            });

    //Add the possible component filters in the component selection lists
    var components = [{"id":0, "name":"Tous les minéraux"}, {"id":1, "name":"Calcium"}, {"id":2, "name":"Magnesium"}, 
        {"id":3, "name":"Sodium"}, {"id":4, "name":"Potassium"}, {"id":5, "name":"Sulfate"}, {"id":6, "name":"Nitrate"}, 
        {"id":7, "name":"Bicarbonate"}, {"id":8, "name":"Chlore"}];
    
    d3.selectAll(".select_component").selectAll()
            .data(components)
            .enter()
            .append("option")
            .attr("value", function(d) {
                return String(d['id']);   
            })
            .html(function(d) {
                return d['name']; 
            });

    //Add error message if it exists
    if(error!==null){
        d3.select("#error")
            .append("p")
            .attr("id", "error_msg")
            .html(error);
    }
    
    //Add the waters in the coverflow
    var li = d3.selectAll(".flip-items").selectAll()
                            .data(waters)
                            .enter()
                            .append("li")
                            .attr("data-flip-title", function(d) {
                                return d['name'];   
                            });

    var a = li.append("a")
            .attr("href", function(d) {
                var url = "spec.water?id=" + String(d['waterId']);
                return url;   
            });

    var d3_container = a.append("div")
        .attr("class", "d3_container");

    var d3_header = d3_container.append("div")
        .attr("id", "d3_header");

    d3_header.append("h1")
        .html(function(d) {
            return d['name']; 
        });

    d3_header.append("p")
        .attr("class", "water_country")
        .html(function(d) {
            return d['country']; 
        });
        
    var d3_values = d3_container.append("div")
            .attr("id", "d3_values");

    var charts = d3_values.append("div")
            .attr("class", "charts");

    var first_chart = charts.append("div")
            .attr("id", "first_chart");

    first_chart.append("h1")
            .html("Tous les minéraux");

    var svg1 = first_chart.append("svg")
            .attr("id", "svg1")
            .attr("width", 500)
            .attr("height", 120);

    var snd_chart = charts.append("div")
            .attr("id", "snd_chart");

    snd_chart.append("h1")
            .html("Bicarbonate");

    var svg2 = snd_chart.append("svg")
            .attr("id", "svg2")
            .attr("width", 500)
            .attr("height", 120);

    function createChartLegend(mainDiv, group) {
        var z = d3.scaleOrdinal(d3.schemeCategory10);
        var mainDivName = mainDiv.substr(1, mainDiv.length);
        $(mainDiv).before("<div class='Legend_" + mainDivName + "' class='pmd-card-body' style='margin-top:0; margin-bottom:0;'></div>");
        var keys = group;
        keys.forEach(function(d) {
            var cloloCode = z(d);
            $(".Legend_" + mainDivName).append("<span class='team-graph team1' style='display: inline-block; margin-right:10px;'>\
                            <span style='background:" + cloloCode +
                ";width: 10px;height: 10px;display: inline-block;vertical-align: middle;'>&nbsp;</span>\
                            <span style='padding-top: 0;font-family:Source Sans Pro, sans-serif;font-size: 13px;display: inline;'>" + d +
                " </span>\
                    </span>");
        });

    }


    var group = ["Minimum du panel", "Valeur pour cette eau", "Maximum du panel"];
    var mainDiv = ".charts";
    createChartLegend(mainDiv, group);

    var margin = {
            top: 5,
            right: 30,
            bottom: 60,
            left: 30
        },
        width = svg1.attr("width"),
        height = svg1.attr("height");

    var x = d3.scaleLinear()
        .rangeRound([margin.left, width - margin.right]);

    x.domain([0, valMaxMineraux(waters)]);

    var y = d3.scaleBand()
        .rangeRound([height - margin.bottom, margin.top])
        .padding(0.1);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var maing = svg1.append("g");

    var g0 = maing.append("g")
        .attr("fill", z(group[0]));

    var g1 = maing.append("g")
        .attr("fill", z(group[1]));

    var g2 = maing.append("g")
        .attr("fill", z(group[2]));

    var data0 = {};
    data0["key"] = group[0];
    data0["value"] = valMinMineraux(waters);

    g0.append("rect")
        .attr("data", JSON.stringify(data0))
        .attr("width", x(data0["value"]) - x(0))
        .attr("x", x(0))
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    g1.append("rect")
        .attr("data", function(d) {
            var data = {};
            data["key"] = group[1];
            data["value"] = d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
            return JSON.stringify(data);;
        })
        .attr("width", function(d){
            return x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium']) - x(data0["value"])
        })
        .attr("x", x(data0["value"]))
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    var data2 = {};
    data2["key"] = group[2];
    data2["value"] = valMaxMineraux(waters);

    g2.append("rect")
        .attr("data", JSON.stringify(data2))
        .attr("width", function(d){
            return x(data2["value"]) - x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'])
        })
        .attr("x", function(d){
            return x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'])
        })
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    svg1.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width * 0.5)
        .attr("y", margin.bottom * 0.5)
        .attr("dx", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Masse (mg/L)");

    // Second svg
    x.domain([0, valMaxKey(waters, "bicarbonate")]);

    maing = svg2.append("g");

    g0 = maing.append("g")
        .attr("fill", z(group[0]));

    g1 = maing.append("g")
        .attr("fill", z(group[1]));

    g2 = maing.append("g")
        .attr("fill", z(group[2]));

    data0["key"] = group[0];
    data0["value"] = valMinKey(waters, "bicarbonate");

    g0.append("rect")
        .attr("data", JSON.stringify(data0))
        .attr("width", x(data0["value"]) - x(0))
        .attr("x", x(0))
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    g1.append("rect")
        .attr("data", function(d) {
            var data = {};
            data["key"] = group[1];
            data["value"] = d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
            return JSON.stringify(data);;
        })
        .attr("width", function(d){
            return x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium']) - x(data0["value"])
        })
        .attr("x", x(data0["value"]))
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    data2["key"] = group[2];
    data2["value"] = valMaxKey(waters, "bicarbonate");

    g2.append("rect")
        .attr("data", JSON.stringify(data2))
        .attr("width", function(d){
            return x(data2["value"]) - x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'])
        })
        .attr("x", function(d){
            return x(d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'])
        })
        .attr("y", y(0))
        .attr("height", y.bandwidth);

    svg2.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width * 0.5)
        .attr("y", margin.bottom * 0.5)
        .attr("dx", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Masse (mg/L)");
}

function valMinMineraux(waters) {
    return d3.min(waters, function(d) {
        return d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
    });
}

function valMaxMineraux(waters) {
    return d3.max(waters, function(d) {
        return d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
    });
}

function valMinKey(waters, key) {
    return d3.min(waters, function(d) {
        return d[key];
    });
}

function valMaxKey(waters, key) {
    return d3.max(waters, function(d) {
        return d[key];
    });
}
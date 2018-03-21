/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function d3Search(waters, component1, component2) {
    //Check components validity:
    var components = [{"id": 0, "name": "Tous les minéraux"}, {"id": 1, "name": "Calcium"}, {"id": 2, "name": "Magnesium"},
        {"id": 3, "name": "Sodium"}, {"id": 4, "name": "Potassium"}, {"id": 5, "name": "Sulfate"}, {"id": 6, "name": "Nitrate"},
        {"id": 7, "name": "Bicarbonate"}, {"id": 8, "name": "Chlore"}];

    var valid1 = checkComp(component1);
    var valid2 = checkComp(component2);

    //Add the waters in the coverflow
    var li = d3.selectAll(".flip-items").selectAll()
            .data(waters)
            .enter()
            .append("li")
            .attr("data-flip-title", function (d) {
                return d['name'];
            });

    var a = li.append("a")
            .attr("href", function (d) {
                var url = "spec.water?id=" + String(d['waterId']);
                return url;
            });

    var d3_container = a.append("div")
            .attr("class", "d3_container");

    var d3_header = d3_container.append("div")
            .attr("id", "d3_header");

    d3_header.append("h1")
            .html(function (d) {
                return d['name'];
            });

    d3_header.append("p")
            .attr("class", "water_country")
            .html(function (d) {
                return d['country'];
            });

    var d3_values = d3_container.append("div")
            .attr("id", "d3_values");

    var charts = d3_values.append("div")
            .attr("class", "charts");
    
    var group = ["Minimum choisi", "Valeur pour cette eau", "Maximum choisi"];

    if (!valid1 && !valid2) {
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

        var valmin = valMinKey(waters, "tous les minéraux");
        var valmax = valMaxKey(waters, "tous les minéraux");
        
        x.domain([0, valmax]);

        g0.append("rect")
                .attr("width", x(valmin) - x(0))
                .attr("x", x(0))
                .attr("y", y(0))
                .attr("height", y.bandwidth);

        g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, "tous les minéraux")) - x(valmin);
                })
                .attr("x", x(valmin))
                .attr("y", y(0))
                .attr("height", y.bandwidth);


        g2.append("rect")
                .attr("width", function (d) {
                    return x(valmax) - x(valKey(d, "tous les minéraux"));
                })
                .attr("x", function (d) {
                    return x(valKey(d, "tous les minéraux"));
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
        maing = svg2.append("g");

        g0 = maing.append("g")
                .attr("fill", z(group[0]));

        g1 = maing.append("g")
                .attr("fill", z(group[1]));

        g2 = maing.append("g")
                .attr("fill", z(group[2]));

        valmin = valMinKey(waters, "bicarbonate");
        valmax = valMaxKey(waters, "bicarbonate");
        
        x.domain([0, valmax]);

        g0.append("rect")
                .attr("width", x(valmin) - x(0))
                .attr("x", x(0))
                .attr("y", y(0))
                .attr("height", y.bandwidth);

        g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, "bicarbonate")) - x(valmin);
                })
                .attr("x", x(valmin))
                .attr("y", y(0))
                .attr("height", y.bandwidth);

        g2.append("rect")
                .attr("width", function (d) {
                    return x(valmax) - x(valKey(d, "bicarbonate"));
                })
                .attr("x", function (d) {
                    return x(valKey(d, "bicarbonate"));
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
    else if (valid1 && valid2 && component1['name'] === component2['name']) {
        if (component1['order'] === component2['order']) {
            var new_component = component1;
            var key = components[new_component['name']]['name'];

            var first_chart = charts.append("div")
                    .attr("id", "first_chart");

            first_chart.append("h1")
                    .html(key);

            var svg1 = first_chart.append("svg")
                    .attr("id", "svg1")
                    .attr("width", 500)
                    .attr("height", 120);

            var mainDiv = ".charts";
            
            if (component1['order'] === "0") {
                new_component['mass'] = String(Math.max(parseFloat(component1['mass'], 10), parseFloat(component2['mass'], 10)));
            } 
            else {
                new_component['mass'] = String(Math.min(parseFloat(component1['mass'], 10), parseFloat(component2['mass'], 10)));
            }

            createChartLegend(mainDiv, group, component1['order']);
            
            var margin = {
                    top: 5,
                    right: 30,
                    bottom: 60,
                    left: 30
                },
                width = svg1.attr("width"),
                height = svg1.attr("height");

            var y = d3.scaleBand()
                    .rangeRound([height - margin.bottom, margin.top])
                    .padding(0.1);
            
            var x = d3.scaleLinear()
                    .rangeRound([margin.left, width - margin.right]);
            
            var z = d3.scaleOrdinal(d3.schemeCategory10);

            var maing = svg1.append("g");

            var g0 = maing.append("g")
                        .attr("fill", z(group[0]));

            var g1 = maing.append("g")
                    .attr("fill", z(group[1]));
            
            var g2 = maing.append("g")
                    .attr("fill", z(group[2]));
            
            var minval = 0;
            if (new_component['order'] === "0") {

                minval = parseFloat(new_component['mass'], 10);
                x.domain([0, valMaxKey(waters, key)]);
                
                g0.append("rect")
                        .attr("width", function (d) {
                            return x(minval) - x(0);
                        })
                        .attr("x", x(0))
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            } 
            else {
                var maxval = parseFloat(new_component['mass'], 10);
                x.domain([0, maxval]);
                
                g2.append("rect")
                        .attr("width", function (d) {
                            return x(maxval) - x(valKey(d, key));
                        })
                        .attr("x", function (d) {
                            return x(valKey(d, key));
                        })
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            }
            
            g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, key)) - x(minval);
                })
                .attr("x", x(minval))
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
        }
        else{
            var key = components[component1['name']]['name'];
            var first_chart = charts.append("div")
                    .attr("id", "first_chart");

            first_chart.append("h1")
                    .html(key);

            var svg1 = first_chart.append("svg")
                    .attr("id", "svg1")
                    .attr("width", 500)
                    .attr("height", 120);

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

            var y = d3.scaleBand()
                    .rangeRound([height - margin.bottom, margin.top])
                    .padding(0.1);
            
            var x = d3.scaleLinear()
                    .rangeRound([margin.left, width - margin.right]);
            
            var z = d3.scaleOrdinal(d3.schemeCategory10);

            var maing = svg1.append("g");

            var g0 = maing.append("g")
                        .attr("fill", z(group[0]));

            var g1 = maing.append("g")
                    .attr("fill", z(group[1]));
            
            var g2 = maing.append("g")
                    .attr("fill", z(group[2]));
            
            if (component1['order'] === "0") {
                var minval = parseFloat(component1['mass'], 10);
                var maxval = parseFloat(component2['mass'], 10);
            }
            else{
                var minval = parseFloat(component2['mass'], 10);
                var maxval = parseFloat(component1['mass'], 10);
            }
            
            x.domain([0, maxval]);
            
            g0.append("rect")
                    .attr("width", function (d) {
                        return x(minval) - x(0);
                    })
                    .attr("x", x(0))
                    .attr("y", y(0))
                    .attr("height", y.bandwidth);

            g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, key)) - x(minval);
                })
                .attr("x", x(minval))
                .attr("y", y(0))
                .attr("height", y.bandwidth);

            g2.append("rect")
                    .attr("width", function (d) {
                        return x(maxval) - x(valKey(d, key));
                    })
                    .attr("x", function (d) {
                        return x(valKey(d, key));
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
        }
    }
    else {
        if (valid1) {
            var key = components[component1['name']]['name'];
            var first_chart = charts.append("div")
                    .attr("id", "first_chart");

            first_chart.append("h1")
                    .html(key);

            var svg1 = first_chart.append("svg")
                    .attr("id", "svg1")
                    .attr("width", 500)
                    .attr("height", 120);

            var mainDiv = ".charts";

            if(valid2 && component1['order']===component2['order']){
                createChartLegend(mainDiv, group, component1['order']);
            }
            else{
                createChartLegend(mainDiv, group);
            }

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

            var minval = 0;
            if (component1['order'] === "0") {

                minval = parseFloat(component1['mass'], 10);
                x.domain([0, valMaxKey(waters, key)]);

                g0.append("rect")
                        .attr("width", function (d) {
                            return x(minval) - x(0);
                        })
                        .attr("x", x(0))
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            } 
            else {
                var maxval = parseFloat(component1['mass'], 10);
                x.domain([0, maxval]);

                g2.append("rect")
                        .attr("width", function (d) {
                            return x(maxval) - x(valKey(d, key));
                        })
                        .attr("x", function (d) {
                            return x(valKey(d, key));
                        })
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            }

            g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, key)) - x(minval);
                })
                .attr("x", x(minval))
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
        }
        if (valid2) {
            var key = components[component2['name']]['name'];

            var snd_chart = charts.append("div")
                    .attr("id", "snd_chart");

            snd_chart.append("h1")
                    .html(key);

            var svg2 = snd_chart.append("svg")
                    .attr("id", "svg2")
                    .attr("width", 500)
                    .attr("height", 120);

            if(!valid1){
                var mainDiv = ".charts";
                createChartLegend(mainDiv, group);
            }

            var margin = {
                    top: 5,
                    right: 30,
                    bottom: 60,
                    left: 30
                },
                width = svg2.attr("width"),
                height = svg2.attr("height");

            var x = d3.scaleLinear()
                    .rangeRound([margin.left, width - margin.right]);

            var y = d3.scaleBand()
                    .rangeRound([height - margin.bottom, margin.top])
                    .padding(0.1);

            var z = d3.scaleOrdinal(d3.schemeCategory10);

            var maing = svg2.append("g");

            var g0 = maing.append("g")
                    .attr("fill", z(group[0]));

            var g1 = maing.append("g")
                    .attr("fill", z(group[1]));

            var g2 = maing.append("g")
                    .attr("fill", z(group[2]));

            var minval = 0;
            if (component2['order'] === "0") {

                minval = parseFloat(component2['mass'], 10);
                x.domain([0, valMaxKey(waters, key)]);

                g0.append("rect")
                        .attr("width", function (d) {
                            return x(minval) - x(0);
                        })
                        .attr("x", x(0))
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            } 
            else {
                var maxval = parseFloat(component2['mass'], 10);
                x.domain([0, maxval]);

                g2.append("rect")
                        .attr("width", function (d) {
                            return x(maxval) - x(valKey(d, key));
                        })
                        .attr("x", function (d) {
                            return x(valKey(d, key));
                        })
                        .attr("y", y(0))
                        .attr("height", y.bandwidth);
            }

            g1.append("rect")
                .attr("width", function (d) {
                    return x(valKey(d, key)) - x(minval);
                })
                .attr("x", x(minval))
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
    } 
}

function valKey(water, key) {
    key = key.toLowerCase();
    if (key === "tous les minéraux") {
        return water['magnesium'] + water['sodium'] + water['potassium'] + water['calcium'];
    } else {
        return water[key];
    }
}

function valMinKey(waters, key) {
    return d3.min(waters, function (d) {
        key = key.toLowerCase();
        if (key === "tous les minéraux") {
            return d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
        } else {
            return d[key];
        }
    });
}

function valMaxKey(waters, key) {
    return d3.max(waters, function (d) {
        key = key.toLowerCase();
        if (key === "tous les minéraux") {
            return d['magnesium'] + d['sodium'] + d['potassium'] + d['calcium'];
        } else {
            return d[key];
        }
    });
}

function checkComp(component) {
    var components = [{"id": 0, "name": "Tous les minéraux"}, {"id": 1, "name": "Calcium"}, {"id": 2, "name": "Magnesium"},
        {"id": 3, "name": "Sodium"}, {"id": 4, "name": "Potassium"}, {"id": 5, "name": "Sulfate"}, {"id": 6, "name": "Nitrate"},
        {"id": 7, "name": "Bicarbonate"}, {"id": 8, "name": "Chlore"}];

    if (!(component['order'] === "0" || component['order'] === "1")) {
        return false;
    } 
    else {
        var regex1 = new RegExp('\\d+');
        var regex2 = new RegExp('\\d+(\\.\\d+)*');
        if (!(regex1.test(component['name']))) {
            return false;
        }
        if (parseInt(component['name'], 10) >= components.length) {
            return false;
        }
        if (!(regex2.test(component['mass']))){
            return false;
        }
        return true;
    }
}

function createChartLegend(mainDiv, group, order="") {
    var z = d3.scaleOrdinal(d3.schemeCategory10);
    var mainDivName = mainDiv.substr(1, mainDiv.length);
    $(mainDiv).before("<div class='Legend_" + mainDivName + "' class='pmd-card-body' style='margin-top:0; margin-bottom:0;'></div>");
    for (var i = 0; i < group.length; i++) {
        var cloloCode = z(group[i]);
        if(order==="0" && i===(group.length - 1)){}
        else if(order==="1" && i===0){}
        else{
            $(".Legend_" + mainDivName).append("<span class='team-graph team1' style='display: inline-block; margin-right:10px;'>\
                            <span style='background:" + cloloCode +
                    ";width: 10px;height: 10px;display: inline-block;vertical-align: middle;'>&nbsp;</span>\
                            <span style='padding-top: 0;font-family:Source Sans Pro, sans-serif;font-size: 13px;display: inline;'>" + group[i] +
                    " </span>\
                    </span>");
        } 
    }
}
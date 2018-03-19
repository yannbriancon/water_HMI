<%-- 
    Document   : search
    Created on : Mar 7, 2018, 2:16:13 PM
    Author     : yann
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Choisir son eau</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=550, initial-scale=1">

    <link rel="stylesheet" href="css/panel.css">
    <link rel="stylesheet" href="css/jquery.flipster.min.css">

    <script type="text/javascript" src="js/d3.v3.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://d3js.org/d3.v4.min.js"></script>
    
    <script src="js/jquery.flipster.js"></script>

</head>
<body>
    <form:form method="POST" action="search.water">
        <div id="search">
            <p>Rechercher par nom : </p>
            <input id="input_text" type="text" name="name" value="${name}" maxlength="30">
            <input type="hidden" name="country" value="${country}">
            <input type="hidden" name="component1_name" value="${component1_name}">
            <input type="hidden" name="component1_order" value="${component1_order}">
            <input type="hidden" name="component1_mass" value="${component1_mass}">
            <input type="hidden" name="component2_name" value="${component2_name}">
            <input type="hidden" name="component2_order" value="${component2_order}">
            <input type="hidden" name="component2_mass" value="${component2_mass}">
            <input id="submit_form" type="submit" value="Rechercher">
        </div>
    </form:form>
    <div id="table_choices">
        <p>Voici les résultats de la recherche ci-dessous :</p>
    </div>
    <form:form method="GET" action="panel.water">
    <div id="application">
        <input id="new_search" type="submit" value="Nouvelle recherche">
    </div>
    </form:form>
    <div id="coverflow">
        <ul class="flip-items">
        </ul>
    </div>
    
    
    <script id="d3" type="text/javascript">
        //Add the waters in the coverflow
        var dataset = ${waters};
        
        var li = d3.selectAll(".flip-items").selectAll()
                                .data(dataset)
                                .enter()
                                .append("li")
                                .attr("data-flip-title", function(d) {
                                    return d['name'];   
                                })
        
        var a = li.append("a")
                .attr("href", function(d) {
                    var url = "spec.water?id=" + String(d['waterId']);
                    return url;   
                })
                
        var d3_container = a.append("div")
            .attr("class", "d3_container")
        
        var d3_header = d3_container.append("div")
            .attr("id", "d3_header")
    
        d3_header.append("h1")
            .html(function(d) {
                return d['name']; 
            })
        
        d3_header.append("p")
            .attr("class", "water_country")
            .html(function(d) {
                return d['country']; 
            })
    
        var d3_values = d3_container.append("div")
            .attr("id", "d3_values")
            
         
        d3_values.append("div")
                .attr("class", "charts")
                .append("svg")
                .attr("width", 500)
                .attr("height", d3_values.attr("height"));
        
        
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
        var group = ["Minimum recherché", "Valeur eau", "Maximum recherché"];
        var parseDate = d3.timeFormat("%b-%Y");
        var mainDiv = ".charts";
        var mainDivName = "charts";
        createChartLegend(mainDiv, group);
        var salesData = [{
                'Minimum recherché': 45,
                'Valeur eau':70,
                'Maximum recherché': 90
            }
        ];
        salesData.forEach(function(d) {
            d = type(d);
        });
        var layers = d3.stack()
            .keys(group)
            .offset(d3.stackOffsetDiverging)
            (salesData);

        var svg = d3.selectAll("svg"),
            margin = {
                top: 20,
                right: 30,
                bottom: 20,
                left: 60
            },
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .rangeRound([margin.left, width - margin.right]);

        x.domain([0, d3.max(layers, stackMax)]);

        var y = d3.scaleBand()
            .rangeRound([height - margin.bottom, margin.top])
            .padding(0.1);

        y.domain([0, 10]);

        function stackMin(layers) {
            return d3.min(layers, function(d) {
                return d[0];
            });
        }

        function stackMax(layers) {
            return d3.max(layers, function(d) {
                return d[0];
            });
        }

        var z = d3.scaleOrdinal(d3.schemeCategory10);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function(d) {
                return z(d.key);
            });

        var rect = g.selectAll("rect")
            .data(function(d) {
                d.forEach(function(d1) {
                    d1.key = d.key;
                    return d1;
                });
                return d;
            })
            .enter().append("rect")
            .attr("data", function(d) {
                var data = {};
                data["key"] = d.key;
                data["value"] = d.data[d.key];
                var total = 0;
                group.map(function(d1) {
                    total = d.data[d1]
                });
                data["total"] = total;
                return JSON.stringify(data);
            })
            .attr("width", function(d) {
                return x(d[1]) - x(d[0]);
            })
            .attr("x", function(d) {
                return x(d[0]);
            })
            .attr("y", function(d) {
                return ;
            })
            .attr("height", y.bandwidth);

        rect.on("mouseover", function() {
            var currentEl = d3.select(this);
            var fadeInSpeed = 120;
            d3.select("#recttooltip_" + mainDivName)
                .transition()
                .duration(fadeInSpeed)
                .style("opacity", function() {
                    return 1;
                });
            d3.select("#recttooltip_" + mainDivName).attr("transform", function(d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                        .attr("width"));
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    yCo = mouseCoords[1] + 10;
                } else {
                    yCo = mouseCoords[1];
                }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
            //CBT:calculate tooltips text
            var tooltipData = JSON.parse(currentEl.attr("data"));
            var tooltipsText = "";
            d3.selectAll("#recttooltipText_" + mainDivName).text("");
            var yPos = 0;
            d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipData.key + ":  " + tooltipData.value);
            yPos = yPos + 1;
            d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Total" + ":  " + tooltipData.total);
            //CBT:calculate width of the text based on characters
            var dims = helpers.getDimensions("recttooltipText_" + mainDivName);
            d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
                .attr("x", dims.w + 4);

            d3.selectAll("#recttooltipRect_" + mainDivName)
                .attr("width", dims.w + 10)
                .attr("height", dims.h + 20);

        });

        rect.on("mousemove", function() {
            var currentEl = d3.select(this);
            currentEl.attr("r", 7);
            d3.selectAll("#recttooltip_" + mainDivName)
                .attr("transform", function(d) {
                    var mouseCoords = d3.mouse(this.parentNode);
                    var xCo = 0;
                    if (mouseCoords[0] + 10 >= width * 0.80) {
                        xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                            .attr("width"));
                    } else {
                        xCo = mouseCoords[0] + 10;
                    }
                    var x = xCo;
                    var yCo = 0;
                    if (mouseCoords[0] + 10 >= width * 0.80) {
                        yCo = mouseCoords[1] + 10;
                    } else {
                        yCo = mouseCoords[1];
                    }
                    var x = xCo;
                    var y = yCo;
                    return "translate(" + x + "," + y + ")";
                });
        });
        rect.on("mouseout", function() {
            var currentEl = d3.select(this);
            d3.select("#recttooltip_" + mainDivName)
                .style("opacity", function() {
                    return 0;
                })
                .attr("transform", function(d, i) {
                    // klutzy, but it accounts for tooltip padding which could push it onscreen
                    var x = -500;
                    var y = -500;
                    return "translate(" + x + "," + y + ")";
                });
        });

        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x))

        var rectTooltipg = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("id", "recttooltip_" + mainDivName)
            .attr("style", "opacity:0")
            .attr("transform", "translate(-500,-500)");

        rectTooltipg.append("rect")
            .attr("id", "recttooltipRect_" + mainDivName)
            .attr("x", 0)
            .attr("width", 120)
            .attr("height", 80)
            .attr("opacity", 0.71)
            .style("fill", "#000000");

        rectTooltipg
            .append("text")
            .attr("id", "recttooltipText_" + mainDivName)
            .attr("x", 30)
            .attr("y", 15)
            .attr("fill", function() {
                return "#fff"
            })
            .style("font-size", function(d) {
                return 10;
            })
            .style("font-family", function(d) {
                return "arial";
            })
            .text(function(d, i) {
                return "";
            });


        function type(d) {
            d.date = parseDate(new Date(d.date));
            group.forEach(function(c) {
                d[c] = +d[c];
            });
            return d;
        }

        var helpers = {
            getDimensions: function(id) {
                var el = document.getElementById(id);
                var w = 0,
                    h = 0;
                if (el) {
                    var dimensions = el.getBBox();
                    w = dimensions.width;
                    h = dimensions.height;
                } else {
                    console.log("error: getDimensions() " + id + " not found.");
                }
                return {
                    w: w,
                    h: h
                };
            }
        };
    
            
        //Add table of the choices of the request
        var choices = ${choices};
        if(choices!=={}){
            var table = d3.select("#table_choices")
                        .append("table")
                
            var table_header = table.append("tr")
                                .attr("id", "table_header")
                        
            var table_values = table.append("tr")
                                .attr("id", "table_values")
           
            table_header.selectAll()
                .data(d3.entries(choices))
                .enter()
                .append("th")
                .html(function(d) {
                    return unescape(d.key); 
                })
                
            table_values.selectAll()
                .data(d3.entries(choices))
                .enter()
                .append("td")
                .html(function(d) {
                    return unescape(d.value); 
                })
        }
    </script>
   
    <script>
        var coverflow = $("#coverflow").flipster();
        
    </script>
     
</body>
</html>
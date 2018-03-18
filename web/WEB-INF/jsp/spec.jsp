<%-- 
    Document   : spec
    Created on : Mar 15, 2018, 9:44:43 PM
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
        <script src="js/jquery.flipster.js"></script>
        <script src="js/d3.min.js"></script>    
        <script src="js/d3pie.min.js"></script>

    </head>
    <body>
        <form:form method="POST" action="panel.water">
            <div id="application">
                <input id="new_search" type="submit" value="Nouvelle recherche">
            </div>
        </form:form>
        <!-- <div id="coverflow">
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
                      
              var div = a.append("div")
                  .attr("class", "d3_container")
                  .append("div")
                  .attr("class", "d3")
                  
              div.append("h1")
                  .html(function(d) {
                      return d['name']; 
                  })
                  .append("p")
                  .attr("class", "water_country")
                  .html(function(d) {
                      return d['country']; 
                  })
                  
          </script>
      
          <script>
              var coverflow = $("#coverflow").flipster();
          </script>-->
        
        <script id="d3" type="text/javascript">
            var dataset = ${waters};
              
           d3.select("body")
                   .append("h1")
                   .text(dataset[0].name);

        </script>

        <div id="pieChart"></div>


        <script>
            var data = ${waters};
            var pie = new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": "Teneur totale :",
                        "fontSize": 20,
                        "font": "courier"
                    },
                    "subtitle": {
                        "text": data[0].calcium + data[0].magnesium + data[0].sodium + data[0].potassium + data[0].nitrate + data[0].sulfate + data[0].bicarbonate + data[0].chlore ,
                        "color": "#999999",
                        "fontSize": 10,
                        "font": "courier"
                    },
                    "location": "pie-center",
                    "titleSubtitlePadding": 10
                },
                "footer": {
                    "text": "Les valeurs sont données à titre indicatif, il se peut que les réelles teneur en sels minéraux diffèrent.",
                    "color": "#999999",
                    "fontSize": 10,
                    "font": "open sans",
                    "location": "bottom-left"
                },
                "size": {
                    "canvasWidth": 590,
                    "pieInnerRadius": "82%",
                    "pieOuterRadius": "70%"
                },
                "data": {
                    "sortOrder": "label-desc",
                    "content": [
                        {
                            "label": "Calcium",
                            "value": data[0].calcium,
                            "color": "#333333"
                        },
                        {
                            "label": "Magnésium",
                            "value": data[0].magnesium,
                            "color": "#444444"
                        },
                        {
                            "label": "Sodium",
                            "value": data[0].sodium,
                            "color": "#555555"
                        },
                        {
                            "label": "Potassium",
                            "value": data[0].potassium,
                            "color": "#666666"
                        },
                        {
                            "label": "Nitrate",
                            "value": data[0].nitrate,
                            "color": "#777777"
                        },
                        {
                            "label": "Sulfate",
                            "value": data[0].sulfate,
                            "color": "#888888"
                        },
                        {
                            "label": "Bicarbonate",
                            "value": data[0].bicarbonate,
                            "color": "#999999"
                        },
                        {
                            "label": "Chlore",
                            "value": data[0].chlore,
                            "color": "#cb2121"
                        }
                    ]
                },
                "labels": {
                    "outer": {
                        "format": "label-value2",
                        "pieDistance": 20
                    },
                    "mainLabel": {
                        "fontSize": 11
                    },
                    "percentage": {
                        "color": "#999999",
                        "fontSize": 11,
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#cccc43",
                        "fontSize": 11
                    },
                    "lines": {
                        "enabled": true,
                        "color": "#777777"
                    },
                    "truncation": {
                        "enabled": true
                    }
                },
                "effects": {
                    "pullOutSegmentOnClick": {
                        "effect": "linear",
                        "speed": 400,
                        "size": 8
                    }
                },
                "misc": {
                    "colors": {
                        "segmentStroke": "#000000"
                    }
                }
            });
        </script>
    </body>
</html>

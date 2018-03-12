<%-- 
    Document   : hello
    Created on : Mar 7, 2018, 2:16:13 PM
    Author     : yann
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Flipster Demo</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=550, initial-scale=1">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/jquery.flipster.min.css">

    <script type="text/javascript" src="js/d3.v3.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.flipster.js"></script>

</head>
<body>

    <h2>Test coverflow D3</h2>

    <div id="coverflow">
        <ul class="flip-items">
            <c:forEach var="item" items="${names}">
                <li data-flip-title="${item}">
                    <c:url value="spec.water" var="url">
                        <c:param name="name" value="${item}" />
                    </c:url>
                    <a href="${url}">
                        <div class="d3_container">
                            <div class="d3">
                                <h1>${item}</h1>
                            </div>
                        </div>
                    </a>
                </li>
            </c:forEach>
        </ul>
    </div>
    
    
    <script type="text/javascript"">

        var dataset = [ 5, 10, 15, 20, 25 ];
        /*
        var names = [ "item_1", "item_2", "item_3", "item_4", "item_5" ];

        d3.select(".flip-items").selectAll()
                                .data(names)
                                .enter()
                                .append("li")
                                .attr("data-flip-title", function(d) {
                                    return d;   
                                })
                                .attr("class", "flip-point")

        d3.selectAll(".flip-point").append("div")
                                .attr("class", "d3_container")

        d3.selectAll(".d3_container").append("div")
                                .attr("class", "d3")
                                */

        d3.selectAll(".d3").selectAll()
                        .data(dataset)
                        .enter()
                        .append("div")
                        .attr("class", "bar")
                        .style("height", function(d) {
                            var barHeight = d * 5;  //Scale up by factor of 5
                            return barHeight + "px";
                        });
    </script>

    <script>
        var coverflow = $("#coverflow").flipster();
    </script>
</body>
</html>

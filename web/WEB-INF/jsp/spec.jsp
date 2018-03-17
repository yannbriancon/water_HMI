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

</head>
<body>
    <form:form method="POST" action="panel.water">
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
    </script>
</body>
</html>

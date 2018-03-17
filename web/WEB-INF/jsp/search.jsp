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
            
            
        
            
        
        //Add the countries in the selection list
        /*var countries = $/{countries};
            
        d3.selectAll("#select_country").selectAll()
                .data(countries)
                .enter()
                .append("option")
                .attr("value", function(d) {
                    return String(d['waterId']);   
                })
                .html(function(d) {
                    return d['country']; 
                })
                
        //Add the possible component filters in the component selection lists
        var components = [{"id":1, "name":"Tous les minéraux"}, {"id":2, "name":"Calcium"}, {"id":3, "name":"Magnesium"}, 
            {"id":4, "name":"Sodium"}, {"id":5, "name":"Potassium"}, {"id":6, "name":"Sulfate"}, {"id":7, "name":"Nitrate"}, 
            {"id":8, "name":"Bicarbonate"}, {"id":9, "name":"Chlore"}];
        d3.selectAll(".select_component").selectAll()
                .data(components)
                .enter()
                .append("option")
                .attr("value", function(d) {
                    return String(d['id']);   
                })
                .html(function(d) {
                    return d['name']; 
                })
                */
    </script>

    <script>
        var coverflow = $("#coverflow").flipster();
    </script>
</body>
</html>
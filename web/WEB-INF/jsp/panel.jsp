<%-- 
    Document   : panel
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
    
    <script src="https://d3js.org/d3.v4.min.js"></script>
   
    <script type="text/javascript" src="js/base.js"></script>
    <script type="text/javascript" src="js/panel.js"></script>

</head>
<body>
    <form:form method="POST" action="search.water">
        <div id="search">
            <p>Rechercher par nom : </p>
            <input id="input_text" type="text" name="name" value="${name}" maxlength="30">
        </div>
        <div id="selection">
            <select id="select_country" name="country">
                <option value="-1">Pays</option>
            </select>
            <select class="select_component" name="component1_name">
                <option value="-1">Composant</option>
            </select>
            <select name="component1_order">
                <option value="0">Masse minimum</option>
                <option value="1">Masse maximum</option>
            </select>
            <div class="component_div">
                <input class="component_text" type="text" name="component1_mass" value="" maxlength="4">
                mg/L
            </div>
            <select class="select_component" name="component2_name">
                <option value="-1">Composant</option>
            </select>
            <select name="component2_order">
                <option value="0">Masse minimum</option>
                <option value="1">Masse maximum</option>
            </select>
            <div class="component_div">
                <input class="component_text" type="text" name="component2_mass" value="" maxlength="4">
                mg/L
            </div>
        </div>
        <div id="application">
            <input id="submit_form" type="submit" value="Rechercher">
        </div>
    </form:form>
    <div id="error"></div>
    <div id="table_choices"></div>
    <div id="coverflow">
        <ul class="flip-items">
        </ul>
    </div>
    
    
       <!-- "footer": {
            "text": "Les valeurs sont données à titre indicatif, il se peut que les teneurs réelles diffèrent.",
            "color": "#999999",
            "fontSize": 10,
            "font": "open sans",
            "location": "bottom-center"
        },-->
    
    <script>
        d3Base(${choices});
        d3Panel(${waters}, ${countries}, ${error});
    </script>

    <script>
        var coverflow = $("#coverflow").flipster();
    </script>
    <footer>
        <p>Les valeurs sont données à titre indicatif, il se peut que les teneurs réelles diffèrent.</p>
    </footer>
</body>
</html>

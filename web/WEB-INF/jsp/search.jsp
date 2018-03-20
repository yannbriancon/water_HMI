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
    
    <script type="text/javascript" src="js/base.js"></script>

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
    
    <script>
        d3Base(${waters}, ${choices});
    </script>

    <script>
        var coverflow = $("#coverflow").flipster();
        
    </script>
</body>
</html>
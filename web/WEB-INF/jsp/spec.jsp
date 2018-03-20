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

        <script type="text/javascript" src="js/spec.js"></script>
        
    </head>
    <body>
        <form:form id="other_search" method="POST" action="panel.water">
            <div id="application">
                <input id="deletesubmit" type="submit" value="Nouvelle recherche" />
            </div>
        </form:form>

        <div id="water_spec">
            <div id="pieChart"></div>
        </div>
        
        <script>
            d3Spec(${waters});
            popUp();
        </script>
    </body>
</html>

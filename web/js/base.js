/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function d3Base(){
    //Add the waters in the coverflow
    var dataset = ${waters};

    var li = d3.selectAll(".flip-items").selectAll()
                            .data(dataset)
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


    d3_values.append("p")
            .text("test");

    //Add error message if it exists
    var error = ${error};
    if(error!==""){
        d3.select("#error")
            .append("p")
            .attr("id", "error_msg")
            .html(${error});
    }

    //Add table of the choices of the request
    var choices = ${choices};
    if(choices!=={}){
        var table = d3.select("#table_choices")
                    .append("table");

        var table_header = table.append("tr")
                            .attr("id", "table_header");

        var table_values = table.append("tr")
                            .attr("id", "table_values");

        table_header.selectAll()
            .data(d3.entries(choices))
            .enter()
            .append("th")
            .html(function(d) {
                return unescape(d.key);
            });

        table_values.selectAll()
            .data(d3.entries(choices))
            .enter()
            .append("td")
            .html(function(d) {
                return unescape(d.value); 
            });
    }
}
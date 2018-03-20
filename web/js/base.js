/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/

function d3Base(choices){
    
    //Add table of the choices of the request
    if(choices!==null){
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
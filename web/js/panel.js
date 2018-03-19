/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function d3Base(){
    //Add the countries in the selection list
    var countries = ${countries};

    d3.selectAll("#select_country").selectAll()
            .data(countries)
            .enter()
            .append("option")
            .attr("value", function(d) {
                return String(d['waterId']);   
            })
            .html(function(d) {
                return d['country']; 
            });

    //Add the possible component filters in the component selection lists
    var components = [{"id":0, "name":"Tous les minéraux"}, {"id":1, "name":"Calcium"}, {"id":2, "name":"Magnesium"}, 
        {"id":3, "name":"Sodium"}, {"id":4, "name":"Potassium"}, {"id":5, "name":"Sulfate"}, {"id":6, "name":"Nitrate"}, 
        {"id":7, "name":"Bicarbonate"}, {"id":8, "name":"Chlore"}];
    d3.selectAll(".select_component").selectAll()
            .data(components)
            .enter()
            .append("option")
            .attr("value", function(d) {
                return String(d['id']);   
            })
            .html(function(d) {
                return d['name']; 
            });
}
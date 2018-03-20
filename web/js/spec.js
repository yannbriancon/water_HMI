/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function d3Spec(waters){    
    var div = d3.select("#water_spec")
            .insert("div", "#pieChart")
            .attr("id", "pie_header")
    
    div.append("h1")
        .text(waters[0].name + "  -  " + waters[0].country);

    div.append("p")
            .html("Valeurs en mg/L")
            .style("color", "#35bc00");
               
    var pie = new d3pie("pieChart", {
        "header": {
            "title": {
                "text": "Teneur totale en sels minéraux",
                "fontSize": 15,
                "font": "courier"
            },
            "subtitle": {
                "text": waters[0].calcium + waters[0].magnesium + waters[0].sodium + waters[0].potassium + " mg/L",
                "color": "#35bc00",
                "fontSize": 15,
                "font": "courier",
                "decimalPlaces": 2
            },
            "location": "pie-center",
            "titleSubtitlePadding": 10
        },
        "size": {
            "canvasHeigth": 600,
            "canvasWidth": 700,
            "pieInnerRadius": "85%",
            "pieOuterRadius": "95%"
        },
        "data": {
            "content": [
                {
                    "label": "Nitrate",
                    "value": waters[0].nitrate,
                    "color": "#42a5f5"
                },
                {
                    "label": "Calcium",
                    "value": waters[0].calcium,
                    "color": "#1565c0"
                },
                {
                    "label": "Potassium",
                    "value": waters[0].potassium,
                    "color": "#2196f3"
                },
                {
                    "label": "Magnésium",
                    "value": waters[0].magnesium,
                    "color": "#1976d2"
                },
                {
                    "label": "Sodium",
                    "value": waters[0].sodium,
                    "color": "#1e88e5"
                },
                {
                    "label": "Sulfate",
                    "value": waters[0].sulfate,
                    "color": "#64b5f6"
                },
                {
                    "label": "Bicarbonate",
                    "value": waters[0].bicarbonate,
                    "color": "#bbdefb"
                },
                {
                    "label": "Chlore",
                    "value": waters[0].chlore,
                    "color": "#90caf9"
                }
            ]
        },
        "labels": {
            "outer": {
                "format": "label-value2",
                "pieDistance": 30
            },
            "inner": {
                    "format": "none"
            },
            "mainLabel": {
                "fontSize": 12
            },
            "percentage": {
                "color": "#1b5e20",
                "fontSize": 11,
                "decimalPlaces": 0
            },
            "value": {
                "color": "#35bc00",
                "fontSize": 12
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
}

function popUp(){
    $('form#other_search').click(function (e) {
        e.preventDefault();
        var c = confirm("Si vous cliquez sur 'OK', vous perdrez les critères en cours. Si vous voulez retourner à la liste des eaux respectant vos critères, cliquez sur 'Annuler' puis sur l'icône précédent de votre navigateur.");
        if (c) {
            $('form#other_search').submit();
        }
    });
};
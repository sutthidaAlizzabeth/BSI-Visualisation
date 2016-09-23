$(function (){

    var source = new Array();
    var target = new Array();
    var edges = new Array();
    var vertical = 1;
    var horizon = 1;

    //get each data from object
    for(i=0;i<cytosol.length;i++){
        //separate pathway by color of node
        //color for node of sucrose/starch metabolism pathway
        var color = '#DF013A';

        if (cytosol[i].pathway == "nucleotide biosynthesis pathway") {
            color = '#FCB1ED';
        }
        else if(cytosol[i].pathway == "cell wall biosynthesis pathway"){
            color = '#FCB1ED';
        }
        else if (cytosol[i].pathway == "pentose phosphate pathway") {
            color = '#FCB1ED';   //ผิด     
        }
        else if (cytosol[i].pathway == "respiration pathway pathway") {
            color = '#FCB1ED'; //ผิด
        }
        else if (cytosol[i].pathway == "amino acid biosynthesis pathway") {
            color = '#FCB1ED'; //ผิด
        }
        else if (cytosol[i].pathway == "fatty acid biosynthesis pathway") {
            color = '#FCB1ED'; //ผิด
        }
        else if (cytosol[i].abbr.startsWith("T") == true) {//transporter
            color = '#FCB1ED'; //ผิด
        }
        else if (cytosol[i].abbr.startsWith("E") == true) {//external
            color = '#000000';
        }

        //create node with source and target -------------------------------

        var sourceData;
        //set source node
        //if there is substance value in array
        if (cytosol[i].substance != undefined) {
            sourceData = {
                "data" : {
                    "id" : cytosol[i].substance,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 15,
                    "height" : 15
                },
                "position":{
                    "x":50,
                    "y":45
                }
            };
        }
        else{// if there is no substance value in arry, so flux will be source
            sourceData = {
                "data" : {
                    "id" : cytosol[i].abbr,
                    "nc": '#959090',
                    "shape" : 'ellipse',
                    "width" : 5,
                    "height" : 5
                },
                "position":{
                    "x":50,
                    "y":45
                }
            };
        }

        source.push(sourceData);

        var targetData;
        //set target node
        //if there is product value in array
        if (cytosol[i].product != undefined) {
            targetData = {
                "data" : {
                    "id" : cytosol[i].product,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 15,
                    "height" : 15
                },
                "position":{
                    "x":50,
                    "y":45
                }
            };
        }
        else{// if there is no substance value in arry, so flux will be source
            targetData = {
                "data" : {
                    "id" : cytosol[i].abbr,
                    "nc": '#959090',
                    "shape" : 'ellipse',
                    "width" : 5,
                    "height" : 5
                },
                "position":{
                    "x":50,
                    "y":45
                }
            };
        }

        target.push(targetData);
        
        // Create edge ----------------------------------------------
        var edgeData;
        //edge between substance and flux
        if (cytosol[i].substance != undefined) {
            edgeData = {
                "data" : {
                    "id": cytosol[i].substance + '-' + cytosol[i].name,
                    "weight": 1,
                    "source": cytosol[i].substance,
                    "target": cytosol[i].abbr,
                    "target_arrow" : cytosol[i].target_arrow,
                    "source_arrow" : cytosol[i].source_arrow
                }
            };
        }
        else{//edge between flux and product
            edgeData = {
                "data" : {
                    "id": cytosol[i].name + '-' + cytosol[i].product,
                    "weight": 1,
                    "source": cytosol[i].abbr,
                    "target": cytosol[i].product,
                    "target_arrow" : cytosol[i].target_arrow,
                    "source_arrow" : cytosol[i].source_arrow
                }
            };
        }
        edges.push(edgeData);
    }


    nodes = target.concat(source);

    // Draw graph -----------------------------------------------------------
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in

        boxSelectionEnabled: false,
        autounselectify: true,

        elements : {
            nodes : nodes,
            edges : edges
        },

        style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(id)',
            'color' : '#000',
            'width' : 'data(width)',
            'height' : 'data(height)',
            'background-color': 'data(nc)',
            'shape' : 'data(shape)'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'data(target_arrow)',
            'source-arrow-shape': 'data(source_arrow)',
            'width': "data(weight)",
            'line-color': '#DCD9D9',
            'haystack-radius': 5,
            'source-arrow-color': '#DCD9D9',
            'target-arrow-color': '#DCD9D9',
            'curve-style': 'haystack' //'bezier'
        }),

        layout: {
          name: 'cose',
//          roots: '#a',
          rows: 1,
          directed: true
        }

    });

});

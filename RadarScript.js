/**
 * Created by GaoYifei on 12/4/16.
 */


/**
 * Created by GaoYifei on 12/4/16.
 */
// Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
//I only made some additions and aesthetic adjustments to make the chart look better
//(of course, that is only my point of view)
//Such as a better placement of the titles at each line end,
//adding numbers that reflect what each circular level stands for
//Not placing the last level and slight differences in color
//
//For a bit of extra information check the blog about it:
//http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html

var RadarChart = {
    draw: function(id, d, options){
        var cfg = {
            radius: 5,
            w: 200,
            h: 200,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 100,
            // color: d3.scale.category10()
            color: d3.scaleOrdinal(d3.schemeCategory10)
        };

        if('undefined' !== typeof options){
            for(var i in options){
                if('undefined' !== typeof options[i]){
                    cfg[i] = options[i];
                }
            }
        }
        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
        var allAxis = (d[0].map(function(i, j){return i.axis}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select("svg").remove();

        var g = d3.select(id)
            .append("svg")
            .attr("width", cfg.w+cfg.ExtraWidthX)
            .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");


        var tooltip;

        //Circular segments
        for(var j=0; j<cfg.levels-1; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data(allAxis)
                .enter()
                .append("svg:line")
                .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
                .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
                .attr("class", "line")
                .style("stroke", "grey")
                .style("stroke-opacity", "0.75")
                .style("stroke-width", "0.3px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
        }

        //Text indicating at what % each level is
        for(var j=0; j<cfg.levels; j++){
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll(".levels")
                .data([1]) //dummy data
                .enter()
                .append("svg:text")
                .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
                .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
                .attr("class", "legend")
                .style("font-family", "sans-serif")
                .style("font-size", "10px")
                .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
                .attr("fill", "#737373")
                .text(((j + 1)*10).toString() + "%");
                // .text(Format(((j+1)*cfg.maxValue/cfg.levels).toFixed(1)));
                // .text(Format((j+1)*cfg.maxValue/cfg.levels));
        }

        series = 0;

        var axis = g.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr("class", "line")
            .style("stroke", "grey")
            .style("stroke-width", "1px");

        axis.append("text")
            .attr("class", "legend")
            .text(function(d){return d})
            .style("font-family", "Lato")
            .style("font-size", "14px")
            .attr("text-anchor", "middle")
            .attr("dy", "1.5em")
            .attr("transform", function(d, i){return "translate(0, -10)"})
            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


        d.forEach(function(y, x){
            dataValues = [];
            g.selectAll(".nodes")
                .data(y, function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll(".area")
                .data([dataValues])
                .enter()
                .append("polygon")
                .attr("class", "radar-chart-serie"+series)
                .style("stroke-width", "2px")
                .style("stroke", cfg.color(series))
                .attr("points",function(d) {
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                        str=str+d[pti][0]+","+d[pti][1]+" ";
                    }
                    return str;
                })
                .style("fill", function(j, i){return cfg.color(series)})
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d){
                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
            series++;
        });
        series=0;


        d.forEach(function(y, x){
            g.selectAll(".nodes")
                .data(y).enter()
                .append("svg:circle")
                .attr("class", "radar-chart-serie"+series)
                .attr('r', cfg.radius)
                .attr("alt", function(j){return Math.max(j.value, 0)})
                .attr("cx", function(j, i){
                    dataValues.push([
                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr("cy", function(j, i){
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr("data-id", function(j){return j.axis})
                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                .on('mouseover', function (d){
                    newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                    newY =  parseFloat(d3.select(this).attr('cy')) - 5;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(Format(d.value.toFixed(1)))
                        .transition(200)
                        .style('opacity', 1);

                    z = "polygon."+d3.select(this).attr("class");
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style("fill-opacity", .7);
                })
                .on('mouseout', function(){
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll("polygon")
                        .transition(200)
                        .style("fill-opacity", cfg.opacityArea);
                })
                .append("svg:title")
                .text(function(j){return Math.max(j.value, 0)});

            series++;
        });
        //Tooltip
        tooltip = g.append('text')
            .style('opacity', 0)
            .style('font-family', 'sans-serif')
            .style('font-size', '13px');
    }
};
var w = 400,
    h = 400;

// var colorscale = d3.scale.category10();
// for d3.v4
var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Legend titles
var LegendOptions = ["Sample Model"];

//Data
var d = [
    [
        {axis:"Year",value:0.59},
        {axis:"Engine CC",value:0.56},
        {axis:"Engine Cylinder",value:0.42},
        {axis:"Engine Valves",value:0.34},
        {axis:"Engine Power",value:0.48},
        {axis:"Engine Torque",value:0.14},
        {axis:"Seats",value:0.11},
        {axis:"Doors",value:0.05},
        {axis:"Weight",value:0.07},
        {axis:"High Way Kilometer/L",value:0.12},
        {axis:"City Kilometer/L",value:0.27},
        {axis:"Fuel Capacity",value:0.03}
        // {axis:"Offline Gaming",value:0.12},
        // {axis:"Photo Video",value:0.4},
        // {axis:"Reading",value:0.03},
        // {axis:"Listen Music",value:0.22},
        // {axis:"Watch TV",value:0.03},
        // {axis:"TV Movies Streaming",value:0.03},
        // {axis:"Listen Radio",value:0.07},
        // {axis:"Sending Money",value:0.18},
        // {axis:"Other",value:0.07},
        // {axis:"Use less Once week",value:0.08}
    ]

];

//Options for the Radar chart, other than default
var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
};
var globalData = [];

function drawRadarMap() {
    RadarChart.draw("#chart", d, mycfg);
}

function initData(){
    var attribute0= {axis: "Year", value: 0};
    var attribute1= {axis: "Engine CC", value: 0};
    var attribute2= {axis: "Cylinder", value: 0};
    var attribute3= {axis: "Valves", value: 0};
    var attribute4= {axis: "Engine Power", value: 0};
    var attribute5= {axis: "Engine Torque", value: 0};
    var attribute6= {axis: "Seats", value: 0};
    var attribute7= {axis: "Doors", value: 0};
    var attribute8= {axis: "Weight", value: 0};
    var attribute9= {axis: "MPG HWY", value: 0};
    var attribute10= {axis: "MPG CITY", value: 0};
    var attribute11= {axis: "Fuel Capacity", value: 0};

    var carModelData = [attribute0, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, attribute7,
        attribute8, attribute9, attribute10, attribute11];
    // console.log("carModelData", carModelData);
    d = [];
    d.push(carModelData);
    LegendOptions = ["Sample Model"];
}

function loadData(carModel){

    // var attribute0= {axis: "Year", value: carModel["Year"]};
    // var attribute1= {axis: "Engine CC", value: carModel["Engine CC"]};
    // var attribute2= {axis: "Cylinder", value: carModel["Cylinder"]};
    // var attribute3= {axis: "Valves", value: carModel["Valves"]};
    // var attribute4= {axis: "Engine Power", value: carModel["Engine Power"]};
    // var attribute5= {axis: "Engine Torque", value: carModel["Engine Torque"]};
    // var attribute6= {axis: "Seats", value: carModel["Seats"]};
    // var attribute7= {axis: "Doors", value: carModel["Doors"]};
    // var attribute8= {axis: "Weight", value: carModel["Weight"]};
    // var attribute9= {axis: "LKM HWY", value: carModel["LKM HWY"]};
    // var attribute10= {axis: "LKM CITY", value: carModel["LKM CITY"]};
    // var attribute11= {axis: "Fuel Capacity", value: carModel["Fuel Capacity"]};
    var maxYear = 2016;
    var maxCapacity = 250;
    var maxLKMC = 128;
    var maxLKMH = 109;
    var maxWeight = 7242;
    var maxDoors = 5;
    var maxSeats = 8;
    var maxTorque = 1100;
    var maxPower = 1115;
    var maxValves = 8;
    var maxCylinder = 12;
    var maxCC = 8400;

    var minYear = 2010;
    var minCapacity = 8;
    var minLKMC = 2;
    var minLKMH = 2;
    var minWeight = 820;
    var minDoors = 2;
    var minSeats = 2;
    var minTorque = 68;
    var minPower = 68;
    var minValves = 2;
    var minCylinder = 0;
    var minCC = 1000;

    var yearValue = (carModel["Year"] - minYear) / (maxYear - minYear);
    var capacityValue = (carModel["Engine CC"] - minCC) / (maxCC - minCC);
    var cyclinderValue = (carModel["Cylinder"] - minCylinder) / (maxCylinder - minCylinder);
    var valvesValue = (carModel["Valves"] - minValves) / (maxValves - minValves);
    var powerValue = (carModel["Engine Power"] - minPower) / (maxPower - minPower);
    var torqueValue = (carModel["Engine Torque"] - minTorque) / (maxTorque - minTorque);
    var seatValue = (carModel["Seats"] - minSeats) / (maxSeats - minSeats);
    var doorValue = (carModel["Doors"] - minDoors) / (maxDoors - minDoors);
    var weightValue = (carModel["Weight"] - minWeight) / (maxWeight - minWeight);
    var LKMHValue = (carModel["LKM HWY"] - minLKMH) / (maxLKMH - minLKMH);
    var LKMCValue = (carModel["LKM City"] - minLKMC) / (maxLKMC - minLKMC);
    var fuelValue = (carModel["Fuel Capacity"] - minCapacity) / (maxCapacity - minCapacity);




    // console.log("yearValue", yearValue);
    // console.log("capacityValue", capacityValue);
    // console.log("cyclinderValue ", cyclinderValue );
    // console.log("valvesValue", valvesValue);
    // console.log("powerValue", powerValue);
    // console.log("torqueValue", torqueValue);
    // console.log("seatValue ", seatValue );
    // console.log("doorValue ", doorValue );
    // console.log("weightValue ", weightValue );
    // console.log("LKMHValue ", LKMHValue );
    // console.log("LKMCValue ", LKMCValue );
    // console.log("fuelValue ", fuelValue );


    var attribute0= {axis: "Year", value: yearValue};
    var attribute1= {axis: "Engine CC", value: capacityValue};
    var attribute2= {axis: "Cylinder", value: cyclinderValue};
    var attribute3= {axis: "Valves", value: valvesValue};
    var attribute4= {axis: "Engine Power", value: powerValue};
    var attribute5= {axis: "Engine Torque", value: torqueValue};
    var attribute6= {axis: "Seats", value: seatValue};
    var attribute7= {axis: "Doors", value: doorValue};
    var attribute8= {axis: "Weight", value: weightValue};
    var attribute9= {axis: "LKM HWY", value: LKMHValue};
    var attribute10= {axis: "LKM CITY", value: LKMCValue};
    var attribute11= {axis: "Fuel Capacity", value: fuelValue};


    // var attribute0= {axis: "Year", value: Math.random()};
    // var attribute1= {axis: "Engine CC", value: Math.random()};
    // var attribute2= {axis: "Cylinder", value: Math.random()};
    // var attribute3= {axis: "Valves", value: Math.random()};
    // var attribute4= {axis: "Engine Power", value: Math.random()};
    // var attribute5= {axis: "Engine Torque", value: Math.random()};
    // var attribute6= {axis: "Seats", value: Math.random()};
    // var attribute7= {axis: "Doors", value: Math.random()};
    // var attribute8= {axis: "Weight", value: Math.random()};
    // var attribute9= {axis: "LKM HWY", value: Math.random()};
    // var attribute10= {axis: "LKM CITY", value: Math.random()};
    // var attribute11= {axis: "Fuel Capacity", value: Math.random()};

    var carModelData = [attribute0, attribute1, attribute2, attribute3, attribute4, attribute5, attribute6, attribute7,
    attribute8, attribute9, attribute10, attribute11];
    // console.log("carModelData", carModelData);
    d.push(carModelData);

    LegendOptions.push(carModel["Maker"] + " " + carModel["Model Name"]);


}

function drawLegend(){


    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w+1000)
        .attr("height", h)
        .attr("x", 250)
        .attr("y", 50);


    //Initiate Legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("x", 500)
        .attr("y", 900)
        .attr("height", 100);
        // .attr('transform', 'translate(90,20)');


    legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function(d, i){ return i * 20;})
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i){ return colorscale(i);})
    ;
//Create text next to squares
    legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function(d, i){ return i * 20 + 9;})
        .attr("font-size", "14px")
        .attr("font-family", "Lato")
        .attr("fill", "#737373")
        .text(function(d) { return d; })
    ;
}

function refreshRadarMap(clickPoint){
    loadData(clickPoint);
    drawRadarMap();
    drawLegend();

}


//Call function to draw the Radar chart
//Will expect that data is in %'s
initData();
RadarChart.draw("#chart", d, mycfg);
drawLegend();
// drawRadarMap();

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w+300)
    .attr("height", h);

document.getElementById("clearButton").onclick = function () {
    console.log("button click");
    initData();
    drawLegend();
    drawRadarMap();
};
//
// //Create the title for the legend
// var text = svg.append("text")
//     .attr("class", "title")
//     .attr('transform', 'translate(90,0)')
//     .attr("x", w - 70)
//     .attr("y", 10)
//     .attr("font-size", "14px")
//     .attr("font-family", "Lato")
//     .attr("fill", "#404040")
//     .text("What % of specs compared with the average value");
//
// //Initiate Legend
// var legend = svg.append("g")
//         .attr("class", "legend")
//         .attr("height", 100)
//         .attr("width", 200)
//         .attr('transform', 'translate(90,20)')
//     ;
// //Create colour squares
// legend.selectAll('rect')
//     .data(LegendOptions)
//     .enter()
//     .append("rect")
//     .attr("x", w - 65)
//     .attr("y", function(d, i){ return i * 20;})
//     .attr("width", 10)
//     .attr("height", 10)
//     .style("fill", function(d, i){ return colorscale(i);})
// ;
// //Create text next to squares
// legend.selectAll('text')
//     .data(LegendOptions)
//     .enter()
//     .append("text")
//     .attr("x", w - 52)
//     .attr("y", function(d, i){ return i * 20 + 9;})
//     .attr("font-size", "14px")
//     .attr("font-family", "Lato")
//     .attr("fill", "#737373")
//     .text(function(d) { return d; })
// ;
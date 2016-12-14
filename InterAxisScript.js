
console.log(d3);

// define a data used by interAxis and define meaningful fields for processing of interAxis.
var dataUnit = function(id, name, country) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.x = 0;
    this.y = 0;
    this.data = [];
};
var carData = []; // the data which eliminate the null entry of the raw data
var interAxisData = []; // This is all data shown in interaxis plot;
var iaAttrList = ["Year", "SUV", "Sedan", "Truck", "Sports", "Wagon", "Minivan", "Engine CC", "Cylinder", "Engine Power", "Engine Torque", "Gasoline", "Diesel", "Electric", "Hybrid", "AWD", "FWD", "RWD", "Automatic Transmission", "Seats", "Doors", "Weight", "MPG HWY", "MPG City", "Fuel Capacity"];
var iaAttrLabels = ["Year", "SUV", "Sedan", "Truck", "Sports", "Wagon", "Minivan", "CC", "Cylinder", "Power", "Torque", "Gasoline", "Diesel", "Electric", "Hybrid", "AWD", "FWD", "RWD", "AT", "Seats", "Doors", "Weight", "MPG hwy", "MPG city", "Cap"];

var iaAttrRange = [];
var xAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]; //Tx
var yAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Ty
var clickedEnd = -1; // indicate which end is selected; -1 by default, 0, 1, 2, 3 for x high, x low, y high, y low;
var selectedId = [[], [], [], []];//indicate how many data points is added into x high, x low, y high, y low; currently allow repeatedly add points into one or more ends.
var weightChanged = false;

// number of attributes in raw data and name of these attributes
var attrLength = 22;
// attribute list from raw csv file
var attrList = ["ID", "Maker", "Model Name", "Trim", "Year", "Body", "Engine CC", "Cylinder", "Engine Type", "Valves", "Engine Power", "Engine Torque", "Fuel Type", "Drive", "Transmission Type", "Seats", "Doors", "Weight", "LKM HWY", "LKM City", "Fuel Capacity", "Country"];
var numberToNation = new Map();
d3.csv("iso3166.csv", function(nations) {
    for (var i = 0; i < nations.length; i++) {
        numberToNation.set(+nations[i]["Number"], nations[i]["Name"]);
    }
    //console.log(numberToNation);
});
var countryMap = new Map();
var countrySelected = -1;

var carsRawData = [];
var csvFile = "cars.csv";
var margin = {top:50,right:50,bottom:50,left:50};
var width = 1200;
var height = 800;
var interAxSize = 700; // interAxis is design as a square; this value should be less than min(width, height) - margin * 2
// boundry of interAxis
var interAxLeft = width - margin.right - interAxSize;
var interAxRight = width - margin.right;
var interAxTop = margin.top;
var interAxBottom = margin.top + interAxSize;
// start point for weight bars
var weightBarStartPointX = (width - margin.right - margin.left - interAxSize - 20) / 2 ;
var maxBarLen = weightBarStartPointX - margin.left;
// max and min value of x, y attributes of objects in interAxisData
var geowidth = 1200;
var geoheight = 350;


var xRange = [0, 0];
var yRange = [0, 0];
// number of scale lines in interAxis chart.
var lineNumInInterAx = 10;
// canvas
var svg = d3.select("#svgdiv").append("svg").attr("width", width).attr("height", height);
//svg.append("rect").attr("width", width).attr("height", height).attr("fill", "#fafafa");
var g = svg.append("g");
// floating information box
var infodiv = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
var infodivLarge = d3.select("body").append("div").attr("class", "tooltipLarge").style("opacity", 0);

var projection = d3.geoMercator().center([-20, 40]).scale(240);
var paddingsvg = d3.select("#svgdiv").append("svg").attr("width", width).attr("height", 50);
var paddingsvg2 = d3.select("#geodiv").append("svg").attr("width", width).attr("height", 50);
var geosvg = d3.select("#geodiv").append("svg").attr("width", geowidth).attr("height", geoheight);
var path = d3.geoPath().projection(projection);

var geog = geosvg.append("g");

var maxList = [];
var minList = [];


function worldMap() {
    d3.json("world-110m2.json", function(error, topology) {
        maxNum = 0;
        minNum = Number.MAX_VALUE;
        countryMap.forEach(function (value, key) {if(value.length > maxNum){maxNum = value.length;} if (value.length < minNum){minNum = value.length} });
        var geoColorScale = d3.scaleLinear().domain([0, maxNum]).range(["blue", "red"]);

        geog.selectAll("path").data(topojson.object(topology, topology.objects.countries).geometries).enter().append("path").attr("id", function(d){return d.id;})
            .attr("d", path).style("fill", function(d)
            {
                if ( countryMap.has(numberToNation.get(d.id)) )
                  {
                      return geoColorScale( countryMap.get(numberToNation.get(d.id)).length ); }
                else
                    {return "gray";}  })
            .on("mouseover", function (d) {
                console.log("mouseover");

            })
            .attr("opacity", 0.5)
            .on("click", function(d){
                console.log("mouseclick");
                console.log(d.id);
                
                if(countryMap.has(numberToNation.get(d.id)))
            {

                if (countrySelected != d.id)
                { d3.selectAll("circle").transition()
            .attr("opacity", function()
            {  if(countryMap.get(numberToNation.get(d.id)).includes(this.id) )
                     {return 0.2}
               else
                   {return 0;} })
                    .duration(500);
                    d3.selectAll("path")
                    .transition().attr("opacity", function()
                    {
                        if(d.id == this.id)
                        {return 1}
                        else {return 0.5} }).duration(500);
                                countrySelected = d.id; }
                    else {d3.selectAll("circle").transition()
            .attr("opacity", 0.2).duration(500); d3.selectAll("path").transition().attr("opacity", 0.5).duration(500); countrySelected = -1; } } })
            .on("mouseover", function(d)
            {
                var tempText;
                if(d.id == 392){
                    tempText = "Japan: \n Toyota \n Honda \n Nissan \n Lexus \n Acura \n Infiniti \n Mazda \n Subaru \n Mitsubishi \n Suzuki  Scion";
                }
                else if(d.id == 410){
                    tempText = "South Korea:   Kia   Hyundai";
                }
                else if(d.id == 752){
                    tempText = "Sweden:   Volvo Koenigsegg  SAAB";
                }
                else if(d.id == 276){
                    tempText = "German:   Audi  BMW  Benz  Volkswagen Porsche  Maybach  Smart";
                }
                else if(d.id == 380){
                    tempText = "Italy:   Fiat  Lamborghini  Maserati  AlfaRomeo  Ferrari";
                }
                else if(d.id == 826){
                    tempText = "Uinited Kingdom:    Bentley  LandRover  Lotus  MINI  RollsRoyce  AstonMartin";
                }
                else if(d.id == 840){
                    tempText = "United State:    Buick  Cadillac  Chevrolet  Chrysler  Dodge  Ford  GMC  Jeep  Lincoln  Ram  Tesla";
                }
                if(countryMap.has(numberToNation.get(d.id))) {
                    infodivLarge.transition().style("opacity", 0.9)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 42) + "px").text(tempText);
                }
                if(countryMap.has(numberToNation.get(d.id)) && (countrySelected == -1) )
                   { d3.selectAll("circle").transition()
                     .attr("opacity", function()
                       {if(countryMap.get(numberToNation.get(d.id)).includes(this.id))
                       {return 0.2} else {return 0;} }).duration(500); }

            })
            .on("mouseout", function(d){ infodivLarge.transition()
            .style("opacity", 0); 
            if (countrySelected == -1) {d3.selectAll("circle").transition().attr("opacity", 0.2).duration(500)} });});
}

// delete data entry if there is any missing attributes.
function trimData(d){
    var len = d.length;
    var newData = [];
    for (var i = 0; i < len; i++) {
        carsRawData.push(d[i]);
        var findNullValue = false;
        for (j = 3; j < attrLength; j++){
            if (d[i][attrList[j]] == "") {
                findNullValue = true;
                break;
            }
        }
        if (findNullValue == true){
            continue;
        }
        //console.log(d[i]);
        newData.push(d[i]);
    }
    return newData;
    //return data without null field
}

// read data and convert them into interAxisData format which can be processed by interAxis plot.
function dataProcess(d){
    var len = d.length;
    for (var i = 0; i < len; i++) {
        interAxisData.push(new dataUnit(d[i]["ID"], d[i]["Maker"] + " " + d[i]["Model Name"] + " " + d[i]["Trim"], d[i]["Country"] ));
        if (countryMap.has(d[i]["Country"])) {
            countryMap.get(d[i]["Country"]).push(d[i]["ID"]);
        } else {
            countryMap.set(d[i]["Country"], []);
        }

        interAxisData[i].data.push(parseInt(d[i]["Year"]));
        //split body attribute into six binary attributes;
        var body = d[i]["Body"].toLowerCase();
        if (body.includes("suv") || body.includes("sport utility")) {
            interAxisData[i].data = interAxisData[i].data.concat([1, 0, 0, 0, 0, 0]);
        } else if (body.includes("sedan")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 1, 0, 0, 0, 0]);
        } else if (body.includes("truck") || body.includes("pickup")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 1, 0, 0, 0]);
        } else if (body.includes("sport")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 0, 1, 0, 0]);
        } else if (body.includes("wagon")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 0, 0, 1, 0]);
        } else if (body.includes("mini")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 0, 0, 0, 1]);
        } else {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 0, 0, 0, 0]);
        }

        interAxisData[i].data.push(parseInt(d[i]["Engine CC"]));
        interAxisData[i].data.push(parseInt(d[i]["Cylinder"]));
        interAxisData[i].data.push(parseInt(d[i]["Engine Power"]));
        interAxisData[i].data.push(parseInt(d[i]["Engine Torque"]));
        //split fuel type attribute;
        var fuelType = d[i]["Fuel Type"].toLowerCase();
        if (fuelType.includes("hybrid")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 0, 1]);
        } else if (fuelType.includes("electric")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 1, 0]);
        } else if (fuelType.includes("diesel")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 1, 0, 0]);
        } else {
            interAxisData[i].data = interAxisData[i].data.concat([1, 0, 0, 0]);
        }
        //split drive attribute;
        var drive = d[i]["Drive"].toLowerCase();
        if (drive.includes("rear")) {
            interAxisData[i].data = interAxisData[i].data.concat([0, 0, 1]);
        } else if (drive.includes("four") || drive.includes("4") || drive.includes("awd") || drive.includes("all")) {
            interAxisData[i].data = interAxisData[i].data.concat([1, 0, 0]);
        } else {
            interAxisData[i].data = interAxisData[i].data.concat([0, 1, 0]);
        }
        //automatic is one, manual is zero
        if (d[i]["Transmission Type"].toLowerCase().includes("auto")) {
            interAxisData[i].data.push(1);
        } else {
            interAxisData[i].data.push(0);
        }

        interAxisData[i].data.push(parseInt(d[i]["Seats"]));
        interAxisData[i].data.push(parseInt(d[i]["Doors"]));
        interAxisData[i].data.push(parseInt(d[i]["Weight"]));
        //convert lkm into mpg
        interAxisData[i].data.push(parseInt(100 * 3.785 / (1.609 * parseFloat(d[i]["LKM HWY"])) ));
        interAxisData[i].data.push(parseInt(100 * 3.785 / (1.609 * parseFloat(d[i]["LKM City"])) ));
        interAxisData[i].data.push(parseInt(d[i]["Fuel Capacity"]));
        //calculate x y coordinate when creating each point
        pointpos = calcCoordinate(i);
        interAxisData[i].x = pointpos[0];
        interAxisData[i].y = pointpos[1];
    }
    for (var i = 0; i < iaAttrList.length; i++) {
        curmin = interAxisData[0].data[i];
        curmax = interAxisData[0].data[i];
        for (j = 1; j < interAxisData.length; j++) {
            if (interAxisData[j].data[i] < curmin) {
                curmin = interAxisData[j].data[i];
            }
            if (interAxisData[j].data[i] > curmax) {
                curmax = interAxisData[j].data[i];
            }
        }
        iaAttrRange.push([curmin, curmax]);
    }
    console.log(iaAttrRange);
    // find range of x and y value for interAxis plot auto adjustment.
    var maxX = interAxisData[0].x;
    var minX = interAxisData[0].x;
    var maxY = interAxisData[0].y;
    var minY = interAxisData[0].y;
    for (var i = 0; i < len; i++) {
        if (interAxisData[i].x > maxX) {
            maxX = interAxisData[i].x;
        } else if (interAxisData[i].x < minX) {
            minX = interAxisData[i].x;
        }
        if (interAxisData[i].y > maxY) {
            maxY = interAxisData[i].y;
        } else if (interAxisData[i].y < minY) {
            minY = interAxisData[i].y;
        }
    }
    xRange[0] = minX;
    xRange[1] = maxX;
    yRange[0] = minY;
    yRange[1] = maxY;

    console.log(countryMap);
    //console.log(xRange);
    //console.log(yRange);
}

// data processing for radar chart
function calcRadarData(carData){
    var maxYear = 0;
    var maxCC = 0;
    var maxPower = 0;
    var maxTorque = 0;
    var maxCylinder = 0;
    var maxSeats = 0;
    var maxDoors = 0;
    var maxValves = 0;
    var maxCapacity = 0;
    var maxLKMHWY = 0;
    var maxLKMCity = 0;

    var maxHMPG = 0;
    var maxCMPG = 0;
    var maxWeight = 0;

    var minYear = 2018;
    var minCC = 100000;
    var minPower = 100000;
    var minTorque = 100000;
    var minCylinder = 100000;
    var minSeats = 100000;
    var minDoors = 100000;
    var minValves = 100000;
    var minCapacity = 100000;
    var minWeight = 100000;
    var minLKMHWY = 100000;
    var minLKMCity = 100000;




    for(var i = 0; i < carData.length; i++){
        if(carData[i]["Year"] > maxYear){
           maxYear = carData[i]["Year"];
        }
        if(carData[i]["Engine CC"] > maxCC){
            maxCC = carData[i]["Engine CC"];
        }
        if(carData[i]["Engine Power"] > maxPower){
            maxPower = carData[i]["Engine Power"];
        }
        if(carData[i]["Engine Torque"] > maxTorque){
            maxTorque = carData[i]["Engine Torque"];
        }
        if(carData[i]["Cylinder"] > maxCylinder){
            maxCylinder = carData[i]["Cylinder"];
        }
        if(carData[i]["Seats"] > maxSeats){
            maxSeats = carData[i]["Seats"];
        }
        if(carData[i]["Doors"] > maxDoors){
            maxDoors = carData[i]["Doors"];
        }
        if(carData[i]["Valves"] > maxValves){
            maxValves = carData[i]["Valves"];
        }
        if(carData[i]["Fuel Capacity"] > maxCapacity){
            maxCapacity = carData[i]["Fuel Capacity"];
        }
        if(carData[i]["LKM HWY"] > maxLKMHWY){
            maxLKMHWY = carData[i]["LKM HWY"];
        }
        if(carData[i]["LKM City"] > maxLKMCity){
            maxLKMCity = carData[i]["LKM City"];
        }
        if(carData[i]["Weight"] > maxWeight){
            maxWeight = carData[i]["Weight"];
        }
    }
    maxList.push(maxYear);
    maxList.push(maxCapacity);
    maxList.push(maxLKMCity);
    maxList.push(maxLKMHWY);
    maxList.push(maxWeight);
    maxList.push(maxDoors);
    maxList.push(maxSeats);
    maxList.push(maxTorque);
    maxList.push(maxPower);
    maxList.push(maxValves);
    maxList.push(maxCylinder);
    maxList.push(maxCC);



    for(i = 0; i < carData.length; i++){
        if(carData[i]["Year"] < minYear){
            minYear = carData[i]["Year"];
        }
        if(carData[i]["Engine CC"] < minCC){
            minCC = carData[i]["Engine CC"];
        }
        if(carData[i]["Engine Power"] < minPower){
            minPower = carData[i]["Engine Power"];
        }
        if(carData[i]["Engine Torque"] < minTorque){
            minTorque = carData[i]["Engine Torque"];
        }
        if(carData[i]["Cylinder"] < minCylinder){
            minCylinder = carData[i]["Cylinder"];
        }
        if(carData[i]["Seats"] < minSeats){
            minSeats = carData[i]["Seats"];
        }
        if(carData[i]["Doors"] < minDoors){
            minDoors = carData[i]["Doors"];
        }
        if(carData[i]["Valves"] < minValves){
            minValves = carData[i]["Valves"];
        }
        if(carData[i]["Fuel Capacity"] < minCapacity){
            minCapacity = carData[i]["Fuel Capacity"];
        }
        if(carData[i]["LKM HWY"] < minLKMHWY){
            minLKMHWY = carData[i]["LKM HWY"];
        }
        if(carData[i]["LKM City"] < minLKMCity){
            minLKMCity = carData[i]["LKM City"];
        }
        if(carData[i]["Weight"] < minWeight){
            minWeight = carData[i]["Weight"];
        }
    }

    minList.push(minYear);
    minList.push(minCapacity);
    minList.push(minLKMCity);
    minList.push(minLKMHWY);
    minList.push(minWeight);
    minList.push(minDoors);
    minList.push(minSeats);
    minList.push(minTorque);
    minList.push(minPower);
    minList.push(minValves);
    minList.push(minCylinder);
    minList.push(minCC);


    console.log("maxYear", maxYear);
    console.log("maxCapacity", maxCapacity);
    console.log("maxLKMC ", maxLKMCity );
    console.log("maxLKMH", maxLKMHWY);
    console.log("maxWeight", maxWeight);
    console.log("maxDoors", maxDoors);
    console.log("maxSeats ", maxSeats );
    console.log("maxTorque ", maxTorque );
    console.log("maxPower ", maxPower );
    console.log("maxValves ", maxValves );
    console.log("maxCylinder ", maxCylinder );
    console.log("maxCC ", maxCC);

    console.log("minYear", minYear);
    console.log("minCapacity", minCapacity);
    console.log("minLKMC ", minLKMCity );
    console.log("minLKMH", minLKMHWY);
    console.log("minWeight", minWeight);
    console.log("minDoors", minDoors);
    console.log("minSeats ", minSeats );
    console.log("minTorque ", minTorque );
    console.log("minPower ", minPower );
    console.log("minValves ", minValves );
    console.log("minCylinder ", minCylinder );
    console.log("minCC ", minCC);
}

// giving weight vector Tx, Ty, calculate x and y coordinate of a point.
function calcCoordinate(idx){
    var ax = 0;
    var ay = 0;
    for (var i = 0; i < iaAttrList.length; i++) {
        ax += interAxisData[idx].data[i] * xAxisWeight[i];
        ay += interAxisData[idx].data[i] * yAxisWeight[i];
    }
    return [ax, ay];
}

// calculate proper interval and start point for a given range, to avoid displaying long float on screen.
function findStartAndInterval(minValue, maxValue, cutNum) {
    var temp = (maxValue - minValue) / cutNum;
    var tempMin = minValue;
    var multiplier = 1;
    var digits = 0;
    while (temp < 1){
        temp = temp * 10;
        multiplier = multiplier * 10;
        tempMin = tempMin * 10;
        digits -= 1;
    }
    while (temp >= 10){
        temp = temp / 10;
        multiplier = multiplier / 10;
        tempMin = tempMin / 10;
        digits += 1;
    }
    temp = Math.floor(temp);
    tempMin = Math.ceil(tempMin / temp) * temp;
    var start = tempMin / multiplier;
    var interval = temp / multiplier
    if (digits >= 0) {
        start = parseInt(start);
        interval = parseInt(interval);
    } else {
        start = parseFloat(start.toFixed(Math.abs(digits)));
        interval = parseFloat(interval.toFixed(Math.abs(digits)));
    }
    console.log(start);
    console.log(interval);
    return [start, interval, digits];
}

// after changing of axis weight, reevaluate weight and refresh global variables.
function refresh() {
    if (selectedId[0].length > 0 && selectedId[1].length > 0) {
        var len0 = selectedId[0].length;
        var len1 = selectedId[1].length;
        var sum0 = [];
        var sum1 = [];
        for (i = 0; i < iaAttrList.length; i++) {
            sum0.push(0);
            sum1.push(0);
            for (j = 0; j < len0; j++) {
                sum0[i] += interAxisData[selectedId[0][j]].data[i];
            }
            sum0[i] /= len0;
            for (k = 0; k < len1; k++) {
                sum1[i] += interAxisData[selectedId[1][k]].data[i];
            }
            sum1[i] /= len1;
            sum0[i] -= sum1[i];

            //sum0 is difference between average high and average low, but need to be divided by max-min of this attribute;
            //if (iaAttrRange[i][1] - iaAttrRange[i][0] == 0) {
            //    sum0[i] = 0;
            //} else {
            //    sum0[i] /= iaAttrRange[i][1] - iaAttrRange[i][0];
            //}
            
            //
        }
        tempmax = Math.abs(sum0[0]);
        for (i = 1; i < iaAttrList.length; i++) {
            if (Math.abs(sum0[i]) > tempmax) {
                tempmax = Math.abs(sum0[i]);
            }
        }
        for (i = 0; i < iaAttrList.length; i++) {
            sum0[i] /= tempmax;
        }
        xAxisWeight = sum0;

    }
    if (selectedId[2].length > 0 && selectedId[3].length > 0) {
        var len2 = selectedId[2].length;
        var len3 = selectedId[3].length;
        var sum2 = [];
        var sum3 = [];
        for (i = 0; i < iaAttrList.length; i++) {
            sum2.push(0);
            sum3.push(0);
            for (j = 0; j < len2; j++) {
                sum2[i] += interAxisData[selectedId[2][j]].data[i];
            }
            sum2[i] /= len2;
            for (k = 0; k < len3; k++) {
                sum3[i] += interAxisData[selectedId[3][k]].data[i];
            }
            sum3[i] /= len3;
            sum2[i] -= sum3[i];
            //sum2 is difference between average high and average low, but need to be divided by max-min of this attribute;
            //if (iaAttrRange[i][1] - iaAttrRange[i][0] == 0) {
            //    sum2[i] = 0;
            //} else {
            //    sum2[i] /= iaAttrRange[i][1] - iaAttrRange[i][0];
            //}
            //
        }
        tempmax = Math.abs(sum2[0]);
        for (i = 1; i < iaAttrList.length; i++) {
            if (Math.abs(sum2[i]) > tempmax) {
                tempmax = Math.abs(sum2[i]);
            }
        }
        for (i = 0; i < iaAttrList.length; i++) {
            sum2[i] /= tempmax;
        }
        yAxisWeight = sum2;
    }
    console.log(xAxisWeight);
    console.log(yAxisWeight);

    for (i = 0; i < interAxisData.length; i++) {
        pointpos = calcCoordinate(i);
        interAxisData[i].x = pointpos[0];
        interAxisData[i].y = pointpos[1];
    }

    var maxX = interAxisData[0].x;
    var minX = interAxisData[0].x;
    var maxY = interAxisData[0].y;
    var minY = interAxisData[0].y;
    for (var i = 0; i < interAxisData.length; i++) {
        if (interAxisData[i].x > maxX) {
            maxX = interAxisData[i].x;
        } else if (interAxisData[i].x < minX) {
            minX = interAxisData[i].x;
        }
        if (interAxisData[i].y > maxY) {
            maxY = interAxisData[i].y;
        } else if (interAxisData[i].y < minY) {
            minY = interAxisData[i].y;
        }
    }
    xRange[0] = minX;
    xRange[1] = maxX;
    yRange[0] = minY;
    yRange[1] = maxY;

    clickedEnd = -1;
    selectedId = [[], [], [], []];
    weightChanged = false;
}

// according new global variables, redraw svg componets or move them to a proper position.
function redraw(){
    d3.selectAll(".end").attr("opacity", 0.5);
    var xScale = d3.scaleLinear().domain(xRange).range([interAxLeft, interAxRight]);
    var yScale = d3.scaleLinear().domain(yRange).range([interAxBottom, interAxTop]);
    var weightScale = d3.scaleLinear().domain([0, 1]).range([0, maxBarLen]);
    //update points, lines, texts and bars
    d3.selectAll(".datapoints").transition().attr("cx", function(d) {return xScale(d.x)}).attr("cy", function(d){return yScale(d.y)}).duration(1000);
    d3.select("#yaxis").transition().attr("x1", function(d){if(xRange[0] > 0 || xRange[1] < 0){ return interAxLeft; }else{return xScale(0);}}).attr("x2", function(d){if(xRange[0] > 0 || xRange[1] < 0){ return interAxLeft; }else{return xScale(0);}}).attr("y1", interAxBottom).attr("y2", interAxTop).duration(1000);
    d3.select("#xaxis").transition().attr("x1", interAxLeft).attr("x2", interAxRight).attr("y1", function(d){if(yRange[0] > 0 || yRange[1] < 0){ return interAxBottom; }else{return yScale(0);}}).attr("y2", function(d){if(yRange[0] > 0 || yRange[1] < 0){ return interAxBottom; }else{return yScale(0);}}).duration(1000);

    d3.selectAll(".ylines").remove();
    d3.selectAll(".xlines").remove();
    d3.selectAll(".ytext").remove();
    d3.selectAll(".xtext").remove();
    xStartAndInterval = findStartAndInterval(xRange[0], xRange[1], lineNumInInterAx);
    yStartAndInterval = findStartAndInterval(yRange[0], yRange[1], lineNumInInterAx);

    for (i = xStartAndInterval[0]; i < xRange[1]; i += xStartAndInterval[1]) {
        g.append("line").attr("class", "ylines").attr("x1", xScale(i)).attr("x2", xScale(i)).attr("y1", interAxBottom).attr("y2", interAxTop).attr("stroke", "gray").style("stroke-dasharray", ("10, 10"));
        g.append("text").attr("class", "ytext").attr("transform", "translate("+ (xScale(i) - 10) +", "+ (interAxBottom + 20) +")").attr("fill", "black").text(function(){if(xStartAndInterval[2] >= 0){return parseInt(i)}else{return parseFloat(i.toFixed(Math.abs(xStartAndInterval[2])));}}).attr("font-size", "12pt");
    }

    for (i = yStartAndInterval[0]; i < yRange[1]; i += yStartAndInterval[1]) {
        g.append("line").attr("class", "xlines").attr("x1", interAxLeft).attr("x2", interAxRight).attr("y1", yScale(i)).attr("y2", yScale(i)).attr("stroke", "gray").style("stroke-dasharray", ("10, 10"));
        g.append("text").attr("class", "xtext").attr("transform", "translate("+ (interAxLeft - 55) +", "+ (yScale(i) + 5) +")").attr("fill", "black").text(function(){if(yStartAndInterval[2] >= 0){return parseInt(i)}else{return parseFloat(i.toFixed(Math.abs(yStartAndInterval[2])));}}).attr("font-size", "12pt");
    }
    console.log(xAxisWeight);
    console.log(yAxisWeight);
    d3.selectAll(".xWeight").remove();
    d3.selectAll(".yWeight").remove();
    for (i = 0; i < iaAttrList.length; i++) {
        g.append("rect").attr("class", "xWeight").attr("id", i).attr("x", function(){if (xAxisWeight[i] >= 0) {return weightBarStartPointX; } else {return weightBarStartPointX - weightScale(Math.abs(xAxisWeight[i]));}}).attr("y", margin.top + (i + 1) * (interAxSize / 60) + i + 2).attr("height", interAxSize / 60).attr("width", weightScale(Math.abs(xAxisWeight[i]))).attr("fill", function(){if(xAxisWeight[i] >= 0){return "red"; }else{ return "blue"; }}).attr("opacity", 0.5).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); }).on("click", function(){  var clickedx = d3.mouse(this)[0]; xAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; d3.select(this).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }); weightChanged = true; console.log(xAxisWeight);}).on("double click", function(){ xAxisWeight[+this.id] = 0; d3.select(this).transition().attr("width", 0); weightChanged = true; console.log(xAxisWeight);});
        g.append("rect").attr("class", "yWeight").attr("id", i).attr("x", function(){if (yAxisWeight[i] >= 0) {return weightBarStartPointX} else {return weightBarStartPointX - weightScale(Math.abs(yAxisWeight[i]));}}).attr("y", margin.top + interAxSize / 2 + (i + 1) * (interAxSize / 60) + i + 22).attr("height", interAxSize / 60).attr("width", weightScale(Math.abs(yAxisWeight[i]))).attr("fill", function(){if(yAxisWeight[i] >= 0){return "red";}else{return "blue";}}).attr("opacity", 0.5).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); }).on("click", function(){  var clickedx = d3.mouse(this)[0]; yAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; d3.select(this).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }); weightChanged = true; console.log(yAxisWeight); }).on("double click", function(){ yAxisWeight[+this.id] = 0; d3.select(this).transition().attr("width", 0); weightChanged = true; console.log(yAxisWeight);});
    }
}

// create the whole interAxis plot
function interAxis() {
    var xScale = d3.scaleLinear().domain(xRange).range([interAxLeft, interAxRight]);
    var yScale = d3.scaleLinear().domain(yRange).range([interAxBottom, interAxTop]);
    var weightScale = d3.scaleLinear().domain([0, 1]).range([0, maxBarLen]);
    maxNum = 0;
    minNum = Number.MAX_VALUE;
    countryMap.forEach(function (value, key) {if(value.length > maxNum){maxNum = value.length;} if (value.length < minNum){minNum = value.length} });
    var geoColorScale = d3.scaleLinear().domain([0, maxNum]).range(["blue", "red"]);

    // svg.append("rect").attr("id", "refresh").attr("x", weightBarStartPointX - weightScale(1)).attr("y", margin.top + interAxSize).attr("height", 30).attr("width", weightScale(1) - 5).attr("fill", "gray").attr("opacity", 0.5).on("click", function(){if((selectedId[0].length > 0 && selectedId[1].length > 0) || (selectedId[2].length > 0 && selectedId[3].length > 0) || weightChanged){ refresh(); redraw();} });
    // svg.append("text").attr("transform", "translate("+ (weightBarStartPointX - weightScale(1) + 40) +", "+ (margin.top + interAxSize + 22) +")").attr("fill", "black").text("Refresh").on("click", function(){if((selectedId[0].length > 0 && selectedId[1].length > 0) || (selectedId[2].length > 0 && selectedId[3].length > 0) || weightChanged){ refresh(); redraw();} });
    // svg.append("rect").attr("id", "clear").attr("x", weightBarStartPointX + 5).attr("y", margin.top + interAxSize).attr("height", 30).attr("width", weightScale(1) - 5).attr("fill", "gray").attr("opacity", 0.5).on("click", function(){ xAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];  yAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  clickedEnd = -1;  selectedId = [[], [], [], []]; weightChanged = false; countrySelected = -1; refresh(); redraw(); d3.select("#xhigh").attr("opacity", 0.5); d3.select("#xlow").attr("opacity", 0.5); d3.select("#yhigh").attr("opacity", 0.5); d3.select("#ylow").attr("opacity", 0.5);});
    // svg.append("text").attr("transform", "translate("+ (weightBarStartPointX + 5 + 45) +", "+ (margin.top + interAxSize + 22) +")").attr("fill", "black")
    //     .text("Clear").on("click", function(){ xAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];  yAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  clickedEnd = -1;  selectedId = [[], [], [], []]; weightChanged = false; countrySelected = -1; refresh(); redraw(); d3.select("#xhigh").attr("opacity", 0.5); d3.select("#xlow").attr("opacity", 0.5); d3.select("#yhigh").attr("opacity", 0.5); d3.select("#ylow").attr("opacity", 0.5);});

    g.append("line").attr("id", "yaxis").attr("x1", function(d){if(xRange[0] > 0 || xRange[1] < 0){ return interAxLeft; }else{return xScale(0);}}).attr("x2", function(d){if(xRange[0] > 0 || xRange[1] < 0){ return interAxLeft; }else{return xScale(0);}}).attr("y1", interAxBottom).attr("y2", interAxTop).attr("stroke", "gray");
    g.append("line").attr("id", "xaxis").attr("x1", interAxLeft).attr("x2", interAxRight).attr("y1", function(d){if(yRange[0] > 0 || yRange[1] < 0){ return interAxBottom; }else{return yScale(0);}}).attr("y2", function(d){if(yRange[0] > 0 || yRange[1] < 0){ return interAxBottom; }else{return yScale(0);}}).attr("stroke", "gray");

    xStartAndInterval = findStartAndInterval(xRange[0], xRange[1], lineNumInInterAx);
    yStartAndInterval = findStartAndInterval(yRange[0], yRange[1], lineNumInInterAx);

    for (i = xStartAndInterval[0]; i < xRange[1]; i += xStartAndInterval[1]) {
        g.append("line").attr("class", "ylines").attr("x1", xScale(i)).attr("x2", xScale(i)).attr("y1", interAxBottom).attr("y2", interAxTop).attr("stroke", "gray").style("stroke-dasharray", ("10, 10"));
        g.append("text").attr("class", "ytext").attr("transform", "translate("+ (xScale(i) - 10) +", "+ (interAxBottom + 20) +")").attr("fill", "black").text(function(){if(xStartAndInterval[2] >= 0){return parseInt(i)}else{return parseFloat(i.toFixed(Math.abs(xStartAndInterval[2])));}}).attr("font-size", "12pt");
    }

    for (i = yStartAndInterval[0]; i < yRange[1]; i += yStartAndInterval[1]) {
        g.append("line").attr("class", "xlines").attr("x1", interAxLeft).attr("x2", interAxRight).attr("y1", yScale(i)).attr("y2", yScale(i)).attr("stroke", "gray").style("stroke-dasharray", ("10, 10"));
        g.append("text").attr("class", "xtext").attr("transform", "translate("+ (interAxLeft - 55) +", "+ (yScale(i) + 5) +")").attr("fill", "black").text(function(){if(yStartAndInterval[2] >= 0){return parseInt(i)}else{return parseFloat(i.toFixed(Math.abs(yStartAndInterval[2])));}}).attr("font-size", "12pt");
    }

    g.selectAll("circle").data(interAxisData).enter().append("circle")
        .attr("class", "datapoints").attr("id", function(d){return d.id})
        .attr("cx", function(d) {return xScale(d.x)})
        .attr("cy", function(d){return yScale(d.y)}).attr("r", 5)
        .attr("fill", function(d){return geoColorScale( countryMap.get(d.country).length );}).attr("opacity", 0.2).on("mouseover", function(d, i)
    { if(d3.select(this).attr("opacity") > 0){infodiv.transition().style("opacity", 0.9)
        .style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(d.name)} })
        .on("mouseout", function(d) { if(d3.select(this).attr("opacity") > 0){infodiv.transition()
            .style("opacity", 0)} }).on("click", function(d, i)
    {    clickPoint = carData[i];
         refreshRadarMap(clickPoint);
         console.log(clickPoint);
         if(clickedEnd >= 0 && clickedEnd < 4)
            { if (selectedId[clickedEnd].length < 3){selectedId[clickedEnd].push(i);} }});

    g.append("rect").attr("class", "end").attr("id", "xhigh").attr("x", interAxRight -40).attr("y", interAxBottom + 25).attr("height", 20).attr("width", 20).attr("fill", "red").attr("opacity", 0.5).on("click", function(){clickedEnd = 0; d3.select("#xhigh").attr("opacity", 1); d3.select("#xlow").attr("opacity", 0.5); d3.select("#yhigh").attr("opacity", 0.5); d3.select("#ylow").attr("opacity", 0.5);}).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text("High End X");}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); });
    g.append("rect").attr("class", "end").attr("id", "xlow").attr("x", interAxLeft + 20).attr("y", interAxBottom + 25).attr("height", 20).attr("width", 20).attr("fill", "blue").attr("opacity", 0.5).on("click", function(){clickedEnd = 1; d3.select("#xlow").attr("opacity", 1); d3.select("#xhigh").attr("opacity", 0.5); d3.select("#yhigh").attr("opacity", 0.5); d3.select("#ylow").attr("opacity", 0.5);}).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text("Low End X");}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); });
    g.append("rect").attr("class", "end").attr("id", "yhigh").attr("x", interAxLeft - 80).attr("y", interAxTop + 15).attr("height", 20).attr("width", 20).attr("fill", "red").attr("opacity", 0.5).on("click", function(){clickedEnd = 2; d3.select("#yhigh").attr("opacity", 1); d3.select("#xhigh").attr("opacity", 0.5); d3.select("#xlow").attr("opacity", 0.5); d3.select("#ylow").attr("opacity", 0.5);}).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text("High End Y");}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); });
    g.append("rect").attr("class", "end").attr("id", "ylow").attr("x", interAxLeft - 80).attr("y", interAxBottom - 15).attr("height", 20).attr("width", 20).attr("fill", "blue").attr("opacity", 0.5).on("click", function(){clickedEnd = 3; d3.select("#ylow").attr("opacity", 1); d3.select("#xhigh").attr("opacity", 0.5); d3.select("#xlow").attr("opacity", 0.5); d3.select("#yhigh").attr("opacity", 0.5); }).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text("Low End Y");}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); });


    for (i = 0; i < iaAttrList.length; i++) {
        g.append("rect").attr("class", "xWeightback").attr("id", i)
            .attr("x", weightBarStartPointX - weightScale(1))
            .attr("y", margin.top + (i + 1) * (interAxSize / 60) + i + 2)
            .attr("height", interAxSize / 60).attr("width", weightScale(1) * 2)
            .attr("fill", "#a0a0a0").attr("opacity", 0.5).on("mouseover",
            function(){infodiv.transition()
            .style("opacity", 0.9).style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);})
            .on("mouseout", function(d) {infodiv.transition().style("opacity", 0); })
            .on("click", function(){ var clickedx = d3.mouse(this)[0]; xAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; tempID = this.id;  d3.selectAll(".xWeight").select(function(){if(this.id == tempID) {  return this;}}).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }).attr("fill", function(){if (clickedx - weightBarStartPointX < 0){ return "blue"; } else {return "red";}  }); weightChanged = true; console.log(xAxisWeight); });
        g.append("rect").attr("class", "xWeight").attr("id", i).attr("x", function(){if (xAxisWeight[i] >= 0) {return weightBarStartPointX; } else {return weightBarStartPointX - weightScale(Math.abs(xAxisWeight[i]));}}).attr("y", margin.top + (i + 1) * (interAxSize / 60) + i + 2).attr("height", interAxSize / 60).attr("width", weightScale(Math.abs(xAxisWeight[i]))).attr("fill", function(){if(xAxisWeight[i] >= 0){return "red"; }else{ return "blue"; }}).attr("opacity", 0.5).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); }).on("click", function(){  var clickedx = d3.mouse(this)[0]; xAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; d3.select(this).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }); weightChanged = true; console.log(xAxisWeight);}).on("double click", function(){ xAxisWeight[+this.id] = 0; d3.select(this).transition().attr("width", 0); weightChanged = true; console.log(xAxisWeight);});
        g.append("rect").attr("class", "yWeightback").attr("id", i).attr("x", weightBarStartPointX - weightScale(1)).attr("y", margin.top + interAxSize / 2 + (i + 1) * (interAxSize / 60) + i + 22).attr("height", interAxSize / 60).attr("width", weightScale(1) * 2).attr("fill", "#a0a0a0").attr("opacity", 0.5).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); }).on("click", function(){ var clickedx = d3.mouse(this)[0]; yAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; tempID = this.id;  d3.selectAll(".yWeight").select(function(){if(this.id == tempID) {   return this;}}).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }).attr("fill", function(){if (clickedx - weightBarStartPointX < 0){ return "blue"; } else {return "red";}  }); weightChanged = true; console.log(yAxisWeight); });
        g.append("rect").attr("class", "yWeight").attr("id", i).attr("x", function(){if (yAxisWeight[i] >= 0) {return weightBarStartPointX} else {return weightBarStartPointX - weightScale(Math.abs(yAxisWeight[i]));}}).attr("y", margin.top + interAxSize / 2 + (i + 1) * (interAxSize / 60) + i + 22).attr("height", interAxSize / 60).attr("width", weightScale(Math.abs(yAxisWeight[i]))).attr("fill", function(){if(yAxisWeight[i] >= 0){return "red";}else{return "blue";}}).attr("opacity", 0.5).on("mouseover", function(){infodiv.transition().style("opacity", 0.9).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 42) + "px").text(iaAttrList[this.id]);}).on("mouseout", function(d) {infodiv.transition().style("opacity", 0); }).on("click", function(){  var clickedx = d3.mouse(this)[0]; yAxisWeight[+this.id] = (clickedx - weightBarStartPointX) / maxBarLen; d3.select(this).transition().attr("width", Math.abs(clickedx - weightBarStartPointX)).attr("x", function(){if (clickedx - weightBarStartPointX < 0){ return clickedx; } else {return weightBarStartPointX;}  }); weightChanged = true; console.log(yAxisWeight); }).on("double click", function(){yAxisWeight[+this.id] = 0; d3.select(this).transition().attr("width", 0);  weightChanged = true; console.log(yAxisWeight);});

        g.append("text").attr("x", weightBarStartPointX - weightScale(1) - 50)
            .attr("y", margin.top + (i + 1) * (interAxSize / 60) + i + 2 + 10)
            .text(iaAttrLabels[i])
            .attr("font-size", "8pt");

        g.append("text").attr("x", weightBarStartPointX - weightScale(1) - 50)
            .attr("y", margin.top + interAxSize / 2 + (i + 1) * (interAxSize / 60) + i + 2 + 10 + 20)
            .text(iaAttrLabels[i])
            .attr("font-size", "8pt");

    }
    g.append("text").attr("transform", "translate("+ (weightBarStartPointX - 50) +", "+ (margin.top + 5) +")").attr("fill", "black").text("X Axis Weight").attr("font-size", "14pt");
    g.append("text").attr("transform", "translate("+ (weightBarStartPointX - 50) +", "+ (margin.top + interAxSize / 2 + 5 + 20) +")").attr("fill", "black").text("Y Axis Weight").attr("font-size", "14pt");
}

d3.csv(csvFile, function(cars){

    console.log(cars);
    carData = trimData(cars);
    calcRadarData(carData);

    dataProcess(carData);
    interAxis();
    worldMap();
});

document.getElementById("clearInterAxis").onclick = function () {
    // console.log("button click");
    xAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    yAxisWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    clickedEnd = -1;
    selectedId = [[], [], [], []];
    weightChanged = false;
    countrySelected = -1;
    refresh();
    redraw();
    d3.select("#xhigh").attr("opacity", 0.5);
    d3.select("#xlow").attr("opacity", 0.5);
    d3.select("#yhigh").attr("opacity", 0.5);
    d3.select("#ylow").attr("opacity", 0.5);

};
document.getElementById("refreshInterAxis").onclick = function () {
    // console.log("button click");
    refresh();
    redraw();
};

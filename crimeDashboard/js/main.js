/*
*    main.js
*/

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left +
            ", " + margin.top + ")");

var t = function(){ return d3.transition().duration(1000); }

/*
var parseTime = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");

*/
var bisectDate = d3.bisector(function(d) { return d.Year; }).left;

// Add the line for the first time
g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", "3px");

// Labels
var xLabel = g.append("text")
    .attr("class", "x axisLabel")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Year");
var yLabel = g.append("text")
    .attr("class", "y axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Crime")

// Scales
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// X-axis
var xAxisCall = d3.axisBottom();
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

// Y-axis
var yAxisCall = d3.axisLeft()
var yAxis = g.append("g")
    .attr("class", "y axis");

// Event listeners
$("#crime-select").on("change", update)

// load the data
d3.csv("data/data.csv", function(data){
    // console.log(data);

    // Data cleaning
    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Murder_MS= +d.Murder_MS;
        d.Robbery= +d.Robbery;
        d.ViolentCrime2= +d.ViolentCrime2;
        d.Burglary= +d.Burglary;
        d.AggAssault= +d.AggAssault;
        d.PropertyCrimeRate= +d.PropertyCrimeRate;
        d.LarcenyTheft= +d.LarcenyTheft;
        d.MotorVehicleTheft= +d.MotorVehicleTheft;
    });

    cdata = data;

    // Run the visualization for the first time
    update();
})

function update() {
    // Filter data based on selections
    var crimeVal = $("#crime-select").val();

    // Update scales
    x.domain(d3.extent(cdata, function(d){ return d.Year; }));
    y.domain([d3.min(cdata, function(d){ return d[crimeVal]; }) / 1.005,
        d3.max(cdata, function(d){ return d[crimeVal]; }) * 1.005]);

/*
    // Fix for format values
    var formatSi = d3.format(".2s");
    function formatAbbreviation(x) {
      var s = formatSi(x);
      switch (s[s.length - 1]) {
        case "G": return s.slice(0, -1) + "B";
        case "k": return s.slice(0, -1) + "K";
      }
      return s;
    }
*/

    // Update axes
    xAxisCall.scale(x);
    xAxis.transition(t()).call(xAxisCall);
    yAxisCall.scale(y);
    yAxis.transition(t()).call(yAxisCall);

    // Clear old tooltips
    d3.select(".focus").remove();
    d3.select(".overlay").remove();

    // Tooltip code
    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");
    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);
    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);
    focus.append("circle")
        .attr("r", 5);
    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");
    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);


    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(cdata, x0, 1),
            d0 = cdata[i - 1],
            d1 = cdata[i],
            d = (d1 && d0) ? (x0 - d0.Year > d1.Year - x0 ? d1 : d0) : 0;
        focus.attr("transform", "translate(" + x(d.Year) + "," + y(d[crimeVal]) + ")");
        focus.select("text").text(function() { return d3.format(",")(d[crimeVal].toFixed(2)); });
        focus.select(".x-hover-line").attr("y2", height - y(d[crimeVal]));
        focus.select(".y-hover-line").attr("x2", -x(d.Year));
    }

    // Path generator
    line = d3.line()
        .x(function(d){ return x(d.Year); })
        .y(function(d){ return y(d[crimeVal]); });

    // Update our line path
    g.select(".line")
        .transition(t)
        .attr("d", line(cdata));

    // Update y-axis label
    var newText = (crimeVal == "Murder_MS") ? "Murder_MS" :
        ((crimeVal == "Robbery") ?  "Robbery" :
        (crimeVal == "ViolentCrime2") ? "ViolentCrime2" :
        (crimeVal == "Burglary") ? "Burglary" :
        (crimeVal == "AggAssault") ? "AggAssault" :
        (crimeVal == "PropertyCrimeRate") ? "PropertyCrimeRate" :
        (crimeVal == "LarcenyTheft") ? "LarcenyTheft" :
        (crimeVal == "MotorVehicleTheft") ? "MotorVehicleTheft" : "Crime");
    yLabel.text(newText);
}

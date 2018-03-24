var w = 500;
var h = 100;
var padding = 2; // this will give the bars a bit of space.
var dataset = [5, 90, 15, 20, 25, 9];

// Create an svg object.
var svg = d3.select("body")
              .append("svg")
                .attr("width", w)
                .attr("height", h);

// Add some rectangles to the the svg object
svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
        .attr("x", function(d, i) { return i* (w / dataset.length)})
        .attr("y", function(d) {return h - d})
        .attr("width", (w / dataset.length) - padding )
        .attr("height", function(d){ return d})
        .attr("fill", "blue");

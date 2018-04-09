var width = 1100
var height = 700

var nodes = d3.range(300).map(function() { return {r: 10}; }),
    root = nodes[0];
var color = d3.scaleOrdinal()
    .domain(["data1", "data2"])
    .range(["#fb5454", "#54befb"]);

root.radius = 0;
root.fixed = true;

const forceX = d3.forceX(width / 2).strength(0.015)
const forceY = d3.forceY(height / 2).strength(0.015)


var force = d3.forceSimulation()
.velocityDecay(0.2)
.force("x", forceX)
.force("y", forceY)
.force("collide", d3.forceCollide().radius(function(d){
  if(d === root){
    return Math.random() * 50 + 100;
  }
  return d.r + 0.5;
}).iterations(5))
.nodes(nodes).on("tick", ticked);

var svg = d3.select("#collision-bubbles-container").append("svg")
.attr("width", width)
.attr("height", height);

svg.selectAll("circle")
    .data(nodes.slice(1))
    .enter().append("circle")
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d, i) {
      var num = (Math.random() * 100);

      if(num < 14) {
        return color("data1");
      }
        return color("data2");
     });

function ticked(e) {
    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
};

svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    root.fx = p1[0];
    root.fy = p1[1];
    force.alphaTarget(0.4).restart();//reheat the simulation
});

// @TODO: YOUR CODE HERE!
const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function (stateData) {

  // Step 1: Parse Data/Cast as numbers
  // ==============================

  var state = []
  var poverty = []
  var noHealthcare = []

  stateData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    state.push(data.abbr);
    poverty.push(data.poverty);
    noHealthcare.push(data.healthcare);
  });

  console.log(state)
  console.log(poverty)
  console.log(noHealthcare)
  // Step 2: Create scale functions
  // ==============================
  const xLinearScale = d3.scaleLinear()
    .domain(d3.extent(poverty))
    .range([0, width-200]);

  const yLinearScale = d3.scaleLinear()
    .domain(d3.extent(noHealthcare))
    .range([height, 0]);

   // Step 3: Create axis functions
   // ==============================
   const bottomAxis = d3.axisBottom(xLinearScale);
   const leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "7")
    .classed("stateCircle",true).attr("text-anchor",top);


    // Step 6: Append Labels to circles

    chartGroup.selectAll("null")
      .data(stateData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .text(d => d.abbr)
      .classed("stateText",true);



  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)")
    .classed("aText",true);

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .text("In Poverty (%)")
    .attr("x",0 - margin.right - 30)
    .classed("aText",true).attr("font-weight", bold);
});


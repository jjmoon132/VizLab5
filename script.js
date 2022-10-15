
let margin = {top:25, right:25,left:40,bottom:25};
let outHeight = 500;
let outWidth = 960;
let width = outWidth - margin.left - margin.right,
	height = outHeight - margin.top - margin.bottom;
let ymin = d3.min(coffeeData,d=>d.stores)
	ymax = d3.max(coffeeData,d=>d.stores)


const svg = d3.select('.chart').append('svg')
	.attr("width", outWidth)
	.attr("height", outHeight);

const g = svg.append("g")
   	.attr("transform", `translate(${margin.left}, ${margin.right})`);

const companyScale = d3.scaleBand()
	.rangeRound([0,width])
    .paddingInner(0.1);
const yScale = d3.scaleLinear()
	.range([height,0]);

g.selectAll("rect")
    .data(coffeeData)
    .enter()
    .append("rect")
    .attr("x",d=>companyScale(d.company))
    .attr("y",d=>yScale(d.stores))
    .attr("width",companyScale.bandwidth())
    .attr("height",d=>height-yScale(d.stores))
    .attr("fill","blue");
const xAxis = d3.axisBottom()
    .scale(companyScale);
const yAxis = d3.axisLeft()
	.scale(yScale);
		///.ticks(5, "s");

g.append("g")
    .attr("class", "axis x-axis")
	.call(xAxis)
	.attr("transform", `translate(0, ${height})`);

g.append("g")
	.attr("class", "axis y-axis")
	.call(yAxis);

svg.append("text")
	.attr('x', 20)
	.attr('y', 20)
	.text("Stores");


function update(data){
    companyScale.domain(data.map(d=>d.company));
    yScale.domain([0, ymax+1000]);

    const bars=g.selectAll(".bar")
        .data(data);
    
    
}

let coffeeData;
d3.csv(
	'coffee-house-chains.csv', d3.autoType).then(data=>{
		coffeeData = data
        console.log("coffeeData", coffeeData);

});
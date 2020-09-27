let dataset = {};
let dates = [];
let data = [];
let obj = { 1:[123, 123] };
let values;


let req = new XMLHttpRequest();
req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
req.onload = () => {
        dataset = JSON.parse(req.responseText);
        values = dataset.data;
        for(var i = 0;i<values.length;i++) {
            dates.push(new Date(values[i][0])) 
        }
        for(var i = 0;i<values.length;i++) {
            data.push(values[i][1])
        }
        
        main()
};
req.send();

function main() {

        console.log(data);

        const xScale = d3.scaleBand()
                        .domain(values.map((d) => d[0]))
                        .rangeRound([0, 1500])
                        .padding(0.1);

        const yScale = d3.scaleLinear()
                        .domain([20, 1820])
                        .range([1820, 0]); 

        const container = d3.select("svg")
                        .classed("container", true);

        const bars = container
                            .selectAll(".bar")
                            .data(values)
                            .enter()
                            .append('rect')
                            .classed("bar", true)
                            .attr("width", 3)
                            .attr("height", (d) =>1900 - yScale(d[1]/10))
                            .attr("x", (d) => xScale(d[0]))
                            .attr("y", (d) => yScale(d[1]/10));
    }

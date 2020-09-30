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

        console.log(dates);

        const xScale = d3.scaleBand()
                        .domain(values.map((d) => d[0]))
                        .rangeRound([0, 1500])
                        .padding(0.1);

        const scale = d3.scaleLinear()
                        .domain(dates.map((d) => d))
                        .range([0, 1500]);
        
        var xMax = new Date(d3.max(dates));
        xMax.setMonth(xMax.getMonth() + 3);

        var cale = d3.scaleTime()
                     .domain([d3.min(dates), xMax])
                     .range([0, 1400]);

        const yScale = d3.scaleLinear()
                        .domain([0, 21000])
                        .range([650, 0]); 

        const container = d3.select("svg")
                        .classed("container", true);

        const bars = container
                            .selectAll(".bar")
                            .data(values)
                            .enter()
                            .append('rect')
                            .classed("bar", true)
                            .attr('data-date',  (d) => (d[0]))
                            .attr('data-gdp',(d) => (d[1]))
                            .attr("width", 3)
                            .attr("height", (d) => 650 - yScale(d[1]))
                            .attr("x", (d) => xScale(d[0]))
                            .attr("y", (d) => yScale(d[1]))
                            .append('title')
                            .attr("id", "tooltip")
                            .text((d) => (d[0]) + " :: $" + (d[1]) + " Billion");

            container.selectAll("text")
                            .data(dataset)
                            .enter()
                            .append("text")
                            .text((d) => d[1])
                            .attr("x", (d, i) => i * 30)
                            .attr("y", (d, i) => h - (d * 3 + 3))

        const xAxis = d3.axisBottom()
                        .scale(cale);
        
        container.append("g")
           .attr("id", "x-axis")
           .attr("transform", "translate(50, 660)")
           .call(xAxis);

        const yAxis = d3.axisLeft()
                        .scale(yScale);

        container.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(50, 0)")
            .call(yAxis);
    }

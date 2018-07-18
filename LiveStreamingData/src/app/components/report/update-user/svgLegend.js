import * as React from 'react';
// import d3 - run npm install --save d3 to add
// d3 to your node_modules
import * as d3 from 'd3';

export class MapLegend extends React.Component {
  
  constructor() {
    super();
    // props, bound methods of your React component
    // etc. can go in here
  }
  
  componentDidMount() {
    // time to make a legend here
    // start by storing all color values in an array
    let colorLegend = ["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)"];

    // get the svg that just mounted - this is componentDidMount()
    // so this function gets fired just after render()
    let svgLegend = d3.select('#legend');

    // now just inject standard D3 code
    svgLegend.append("g")
        .attr("transform", "translate(500, 525)")
        .selectAll("rect")
        .data(colorLegend)
        .enter()
        .append("rect")
        .attr("fill", function(d, i){ return colorLegend[i]; })
        .attr("x", function(d, i){ return (i*30); })
        .attr("y", 30)
        .attr("width", 30)
        .attr("height", 20);

    // add a title
    svgLegend.append("text")
        .attr("transform", "translate(500, 525)")
        .attr("font-size", "12px")
        .attr("font-family", "HelveticaNeue-Bold, Helvetica, sans-serif")
        .attr("y", 20)
        .text("Shootings Per Million");

    // add numbers as labels
    let labelsLegend = ["0-1","1-3","3-5","5-7","7-10","10-12","12-15",">15"];
    
    svgLegend.append("g")
        .attr("transform", "translate(500, 525)")
        .selectAll("text")
        .data(labelsLegend)
        .enter()
        .append("text")
        .attr("font-size", "10px")
        .attr("font-family", "HelveticaNeue-Light, Helvetica, sans-serif")
        .attr("x", function(d, i){ return (i*30); })
        .attr("y", 60)
        .text(function(d){ return d; })
  }
  
  render() {
    return <svg id='legend'></svg>;
  }
}


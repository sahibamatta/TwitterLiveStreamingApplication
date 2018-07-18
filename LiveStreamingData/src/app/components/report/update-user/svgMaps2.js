import React, { Component } from "react"
import { scaleLinear } from "d3-scale"
// If you want to use an object instead of requesting a file:
import * as data from '../../../../../public/world-50m.json';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

import { Marker, Markers } from "react-markers";
import Datamap from "datamap";


const colorScale = scaleLinear()
  .domain([0, 100000000, 1338612970]) // Max is based on China
  .range(["#FFF176", "#FFC107", "#E65100"])

export class ChoroplethMap extends Component {


  render() {

    var basic_choropleth = new Datamap({
        element: document.getElementById("basic_choropleth"),
        projection: 'mercator',
        fills: {
          defaultFill: "#ABDDA4",
          authorHasTraveledTo: "#fa0fa0"
        },
        data: {
          USA: { fillKey: "authorHasTraveledTo" },
          JPN: { fillKey: "authorHasTraveledTo" },
          ITA: { fillKey: "authorHasTraveledTo" },
          CRI: { fillKey: "authorHasTraveledTo" },
          KOR: { fillKey: "authorHasTraveledTo" },
          DEU: { fillKey: "authorHasTraveledTo" },
        }
      });
      
      var colors = d3.scale.category10();
      
      window.setInterval(function() {
        basic_choropleth.updateChoropleth({
          USA: colors(Math.random() * 10),
          RUS: colors(Math.random() * 100),
          AUS: { fillKey: 'authorHasTraveledTo' },
          BRA: colors(Math.random() * 50),
          CAN: colors(Math.random() * 50),
          ZAF: colors(Math.random() * 50),
          IND: colors(Math.random() * 50),
        });
      }, 2000);
      

    return (
      <div id ="basic_choropleth">
        
      </div>
    )
  }
}


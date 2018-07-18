import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ReactHeatmap from "react-heatmap";
import { Map, Marker, Popup, TileLayer } from "../../../../../react-leaflet-heatmap-layer/node_modules/react-leaflet"
import HeatmapLayer from "../../../../../react-leaflet-heatmap-layer/src/HeatmapLayer";
import { addressPoints } from "../../../../../realworld.10000.js"
import HeatMap from "react-heatmap-grid";



import { request } from "https";
let citySelectId = "";
let v = "";
let vi = [];
let keys = [];
let values = [];
var noOfProperties = 0;
export class UpdateUserMetadata extends React.Component {

  constructor(props) {
    super(props)
    this.state = {


    }


  }

getNo(){
  return 1;
}

  render() {

    const ReactHeatmap = require('react-heatmap');
    const data = [{ x: 10, y: 15, value: 5 }, { x: 50, y: 50, value: 2 }];

   // const xLabels = new Array(3).fill(0).map((_, i) => `${i}`);
    const xLabels = [4]
    //const yLabels = ['Sun', 'Mon', 'Tue'];
    const yLabels = [2];

    const xLabels2 = [3]
    //const yLabels = ['Sun', 'Mon', 'Tue'];
    const yLabels2 = [1]

    const xLabels1 = [3,1,2];
    //const yLabels = ['Sun', 'Mon', 'Tue'];
    const yLabels1 = [2];


   // const data1 = new Array(yLabels.length)
     // .fill(0)
      //.map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));

      const data1= [
        [4],
        [2]
        
      ];

      const data2= [
        [3],
        [1]
        
      ];
      

     

    return (
      <div>


        <HeatMap xLabels={xLabels} yLabels={yLabels} data={data1} 	/>
        <HeatMap xLabels={xLabels2} yLabels={yLabels2} data={data2} 	/>
        

      </div>
    );
  }

}

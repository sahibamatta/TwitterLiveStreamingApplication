import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ReactHeatmap from "react-heatmap";
import "heatmap.js"

export class UpdateUserMetadata extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
       
      }
    }

  render() {
    
    let data = [{ x: 10, y: 15, value: 5}, { x: 50, y: 50, value: 1 }, { x: 80, y: 50, value: 2 }];

    var heatmap =window.h337.create({
        container: domElement
      });
      
      heatmap.setData({
        max: 5,
        data: [{ x: 10, y: 15, value: 5}]
      });
    return (
       <div>
           <Heatmap   data={data}   />
</div>
    )
  }
}



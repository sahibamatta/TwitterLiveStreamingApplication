import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export class UpdateUserMetadata extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
       
      }
    }

  render() {
    
    var heatmapWidth = 350
    var heatmapHeight = 400
    return (
        <div>
            <svg width="360" height ="400">
        <defs>
        <linearGradient id="gradient" >
      <stop className="a1" offset="10%" stopColor="#def791" />
      <stop offset="20%" stopColor="#c5e26a" />
      <stop offset="40%" stopColor="#369fb9" />
      <stop offset="80%" stopColor="#37b1cf" />    
        </linearGradient>
      </defs>

<rect fill="url(#gradient)" width={heatmapWidth} height={heatmapHeight}/>

</svg>

 <svg width="360" height ="400">
        <defs>
        <linearGradient id="gradient1" >
        <text x="0" y="10"  fill="blue"> Hello </text>
      <stop offset="10%" stopColor="#e5fc9f" >
      
          </stop>

      <stop  offset="10.01%" stopColor="#e5fc9f" />
      <stop offset="20%" stopColor="#e5fc9f" />
      <stop offset="20.01%" stopColor="#e5fc9f" />
      <stop offset="40%" stopColor="#97b53d" />    
      <stop offset="40.01%" stopColor="#97b53d" /> 
      <stop offset="80%" stopColor="#354701" />    
      <stop offset="80.01%" stopColor="#354701" />    
        </linearGradient>
      </defs>
      <g className="series"> 
<rect className ="bar" fill="url(#gradient1)" width={heatmapWidth} height={heatmapHeight}/>>
<text className="label" x="60" y="197">Cats</text>
</g>

</svg>
</div>
    )
  }
}



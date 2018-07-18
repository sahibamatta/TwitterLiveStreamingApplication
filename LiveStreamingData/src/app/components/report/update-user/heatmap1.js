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

    
    return (

      <div className="content">
        <div className="container clearfix">
          <div className="main-content">
            <div className="property-form">
              <div className="form-wrap">

                <svg width="2000" height="500">
                  <rect className="rectclass" fill="#baf20c" height="500" stroke="#000000" width="510"></rect>
                  <g>
                    <rect className="rectclass" width="450" height="498" fill="#d0ef70" ></rect>
                    <text x="450" y="200" fill="#000000" glyphOrientationVertical="auto">India(20%)</text>
                  </g>

                  <g>
                    <rect className="rectclass" width="400" height="498" fill="#d5f477" ></rect>
                    <text x="10" y="200">Label 2</text>
                  </g>


                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



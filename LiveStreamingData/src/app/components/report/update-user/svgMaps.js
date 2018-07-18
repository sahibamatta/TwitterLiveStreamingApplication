import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Component } from "react"
import ReactDOM from "react-dom"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps"

import { Marker, Markers } from "react-markers";

import * as data from '../../../../../public/world-50m.json';




export class UpdateUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    getData() {
        console.log("data is ::" + JSON.stringify(data));
    }

    render() {


        return (

            <div>
                {this.getData()}
                <ComposableMap>
                    <ZoomableGroup>
                        <Geographies geography={data}>
                            {(geographies, projection) =>
                                geographies.map((geography, i) =>
                                    <Geography
                                        key={geography.id}
                                        geography={geography}
                                        projection={projection}
                                    />
                                )
                            }
                        </Geographies>
                        <Markers>
                            <Marker marker={{ coordinates: [8.5, 47.3] }}>
                                
                            </Marker>
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>


            </div >

        )
    }
}



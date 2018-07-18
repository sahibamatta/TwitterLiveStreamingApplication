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
import Datamap from "datamap";
import * as data from '../../../../../public/world-50m.json';





export class UpdateUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    addFillKey(mapData){
        
                  mapData["AZ"].fillKey = "lightBlue"
             
                  mapData["DE"].fillKey = "justBlue"
              
                  mapData["CO"].fillKey = "mediumBlue"
              }
          
      

    render() {


        var stateData = {
        AZ: {
                userVisits: 5
            },
        CO: {
                userVisits: 15
            },
        DE: {
                userVisits: 32
            }
    }

        var map = new Datamap({
            element: document.getElementById('container'),
            scope: 'usa',
            fills: {
              'lightBlue': '#cc4731',
              'justBlue': '#306596',
              'deepBlue': '#667faf',
              'mediumBlue': '#a9c0de',
              'deepBlue': '#ca5e5b',              
              'defaultFill': '#eddc4e'
            },
            data: stateData
        })


        return (

            <div id ="container">
                {this.addFillKey(data   )}
               


            </div >

        )
    }
}



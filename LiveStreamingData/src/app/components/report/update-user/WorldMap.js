import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import * as data from "../../../../../public/world-110m.json"
import "../../../html/assets/css/global.css"
import "../../../html/assets/css/style.css";
import { TagCloud } from "react-tagcloud";
import { WordLimit } from "react-word-limit";
let citiesDynamic = [];

const urlForLiveStreamData = "http://localhost:8080/LiveStreamingApp/stream/data";

export class WorldMap extends Component {
    constructor() {
        super()
        this.state = {
            worlddata: [],
            cities: [

                { name: "China", coordinates: [116.4074, 39.9042], count: 0 },
                { name: "India", coordinates: [77.1025, 28.7041], count: 0 },
                { name: "Indonesia", coordinates: [106.8650, -6.1751], count: 0 },
                { name: "Japan", coordinates: [139.6917, 35.6895], count: 0 },
                { name: "Kenya", coordinates: [36.820, -1.290], count: 0 },
                { name: "Turkey", coordinates: [32.866287, 39.925533], count: 0 },
                { name: "United States of America", coordinates: [-99.1332, 19.4326], count: 0 }


            ],
            liveTweets: [],
            locationCount: [],
            frequentlyUsedTerms: [],
            countOfLoc: [],
            errorDiv: "" , 
            selectedLocation : ""
        }

        this.handleCountryClick = this.handleCountryClick.bind(this)
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
        this.handleMarkerChange = this.handleMarkerChange.bind(this)
        this.getLocationCount = this.getLocationCount.bind(this)
        this.getCountryLocationCount = this.getCountryLocationCount.bind(this)
    }



    projection() {
        return geoMercator()
            .scale(100)
            .translate([800 / 2, 450 / 2])
    }
    handleCountryClick(countryIndex) {
        console.log("Clicked on country: ", this.state.worlddata[countryIndex])
    }
    handleMarkerClick(markerIndex) {
        console.log("Marker: ", this.state.cities[markerIndex]);
    }

    handleMarkerChange(markerIndex) {
        console.log("Marker: ", this.state.cities[markerIndex]);
        var name= this.state.cities[markerIndex].name;
        var count =this.state.cities[markerIndex].count;
        var changeValue = "Selected Location is :"+name+ " and Tweet count is:"+count;
        this.setState({
            selectedLocation : changeValue
        })
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return
                }
                response.json().then(worlddata => {
                    this.setState({
                        worlddata: feature(worlddata, worlddata.objects.countries).features,
                    })
                })
            }),

            fetch(urlForLiveStreamData)
                .then(response => {
                    if (!response.ok) {
                        throw Error("Network request failed");
                    }
                    return response.json();
                })
                .then(d => {
                    console.log(d);
                    this.setState({
                        status: d.status,
                        message: d.message
                    }, () => {
                        if (d.status == 1) {
                            console.log("locationcount::" + d.locationCount);
                            this.setState({
                                liveTweets: d.liveTweets,
                                locationCount: d.locationCount,
                                frequentlyUsedTerms: d.frequentlyUsedTerms
                            }, () => {
                                this.getLocationCount();
                                this.getCountryLocationCount();
                            }
                            )
                        }
                        else {
                            this.setState({
                                errorDiv: data.message
                            })
                        }
                    }
                    )

                }), () => {
                    this.setState({
                        requestFailed: true
                    })
                }

    }





    getLocationCount() {
        var count = [];
        for (var i = 0; i < this.state.locationCount.length; i++) {
            if (i != 6) {
                count[i] = this.state.locationCount[i].count;
                console.log("count[i] is:" + count[i]);
            }
        }

        this.setState({
            countOfLoc: count
        })

    }





    getCountryLocationCount() {
        var citiesClone = []
        citiesClone = Array.from(Object.create(this.state.cities));

        console.log("in getCounrtyLocationCount");
        for (var i = 0; i < citiesClone.length; i++) {
            for (var j = 0; j < this.state.locationCount.length; j++) {
                console.log("citydynamic name::" + citiesClone[i].name + "::location::" + this.state.locationCount[j].location);
                if (citiesClone[i].name == this.state.locationCount[j].location) {
                    citiesClone[i].count = this.state.locationCount[j].count;
                    break;
                }

            }

        }

        this.setState({
            cities: citiesClone
        })

    }


    render() {


       /* const data = [
            { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
            { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
            { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
            { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
            { value: "Webpack", count: 22 }, { value: "Babel.js", count: 7 },
            { value: "ECMAScript", count: 25 }, { value: "Jest", count: 15 },
            { value: "Mocha", count: 17 }, { value: "React Native", count: 27 },
            { value: "Angular.js", count: 30 }, { value: "TypeScript", count: 15 },
            { value: "Flow", count: 30 }, { value: "NPM", count: 11 },
        ];
*/

        const options = {
            luminosity: 'light',
            hue: 'blue'
        };

        if (this.state.requestFailed) return (<p>Failed...</p>);
        if (!this.state.status || !this.state.message) return (<div className="content">
            <div className="container clearfix">

                <div className="main-content">
                    <div className="property-form">
                        <h1 className="page-title">Getting Live Twitter Streams ..</h1>
                    </div>
                </div>
            </div>
        </div>);


        var rows = [];
        console.log("this.state.liveTweets len--" + this.state.liveTweets.length)

        for (var i = 0; i < this.state.liveTweets.length; i++) {
            rows.push(
                <tr key={i}>
                    <td >{this.state.liveTweets[i].id}</td>
                    <td>{this.state.liveTweets[i].location}</td>
                    <td>{this.state.liveTweets[i].tweets}</td>
                </tr >
            );
        }

        var locationCountRows = [];
        console.log("this.state.locationCount len--" + this.state.locationCount.length)

        for (var i = 0; i < this.state.locationCount.length; i++) {
            locationCountRows.push(
                <tr key={"location" + i}>
                    <td >{this.state.locationCount[i].location}</td>
                    <td>{this.state.locationCount[i].count}</td>
                </tr >
            );
        }



        var dataFromTerm = [];
        for (var i = 0; i < this.state.frequentlyUsedTerms.length; i++) {

            dataFromTerm.push({
                value: this.state.frequentlyUsedTerms[i].terms,
                count: this.state.frequentlyUsedTerms[i].count
            });
        }





        return (

            <div className="content">
                <div className="container clearfix">

                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title-right">Twitter Live Streaming</h1>

                            <div className="form-wrap">
                                <h3 className="page-title">HeatMap Showing Origin Of Tweets</h3>
                                <svg width={800} height={450} viewBox="0 0 800 450">
                                    <g className="countries">
                                        {
                                            this.state.worlddata.map((d, i) => (
                                                <path
                                                    key={`path-${i}`}
                                                    d={geoPath().projection(this.projection())(d)}
                                                    className="country"
                                                    fill={`rgba(38,50,56,${1 / this.state.worlddata.length * i})`}
                                                    stroke="#FFFFFF"
                                                    strokeWidth={0.5}
                                                    onClick={() => this.handleCountryClick(i)}
                                                />
                                            ))
                                        }
                                    </g>                                    
                                    <g className="markers">
                                        {
                                            this.state.cities.map((city, i) => (
                                                <circle
                                                    key={`marker-${i}`}
                                                    cx={this.projection()(city.coordinates)[0]}
                                                    cy={this.projection()(city.coordinates)[1]}
                                                    r={city.count / 2}
                                                    fill="#E91E63"
                                                    stroke="#FFFFFF"
                                                    className="marker" onMouseOver={() => this.handleMarkerChange(i)}
                                                    onClick={() => this.handleMarkerClick(i)}
                                                />
                                            ))
                                        }
                                    </g>
                                </svg>
                            </div>
                            <div className="form-wrap" id ="LocationId"><h1>{this.state.selectedLocation}</h1></div>

                            <br /><br /><br /><br /><br />


                            <div className="form-wrap">
                                <h2 className="page-title">Location Wise Tweet Count</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th >Location (Country Wise)</th>
                                            <th >Count</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locationCountRows}

                                    </tbody>
                                </table>
                            </div>

                            <br /><br /><br /><br /><br />

                            <div className="form-wrap">
                                <h1>Frequently Used Terms</h1>
                                <TagCloud minSize={12}
                                    maxSize={35}
                                    tags={dataFromTerm}
                                    onClick={tag => console.log('clicking on tag:', tag)} />
                            </div>
                            <br /><br /><br /><br /><br />

                            <div className="form-wrap">
                                <h2 className="page-title">Live Tweet Feed</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th >Id</th>
                                            <th >Location</th>
                                            <th >Tweets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


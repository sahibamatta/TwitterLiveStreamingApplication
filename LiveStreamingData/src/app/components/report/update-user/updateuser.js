import React from "react";
import { Header } from "../../commons/header";
import {WorldMap} from "./WorldMap"
import { Footer } from "../../commons/footer";

export class UpdateUser extends React.Component {

    render() {
        return (
            <div>
                <Header/> 
                <WorldMap/>
                <Footer/>    
            </div>
        );
    }
}

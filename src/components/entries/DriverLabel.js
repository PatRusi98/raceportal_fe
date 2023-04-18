import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

import slovakia from "../../assets/images/flags/slovakia.png"
import czech from "../../assets/images/flags/czech-republic.png"

class DriverLabel extends Component {

    getCountry = () => {


        switch (this.props.driver.country){
            case "SK":
                return <span><img style={{width:"22px"}} className={"me-1"} src={slovakia}/>{this.props.driver.name}</span>
            case "CZ":
                return <span><img style={{width:"22px"}} className={"me-1"} src={czech}/>{this.props.driver.name}</span>
            default:
                return "undefined"
        }

    }

    render() {
        return (
            <React.Fragment>
                {this.getCountry()}
            </React.Fragment>
        );
    }
}

export default withTranslation()(DriverLabel);
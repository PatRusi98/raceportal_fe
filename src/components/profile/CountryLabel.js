import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

import slovakia from "../../assets/images/flags/slovakia.png"
import czech from "../../assets/images/flags/czech-republic.png"

class CountryLabel extends Component {

    getCountry = () => {

        switch (this.props.country){
            case "SK":
                return <span><img style={{width:"22px"}} className={"me-1"} src={slovakia}/>{this.props.t("Slovak Republic")}</span>
            case "CZ":
                return <span><img style={{width:"22px"}} className={"me-1"} src={czech}/>{this.props.t("Czech Republic")}</span>
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

export default withTranslation()(CountryLabel);
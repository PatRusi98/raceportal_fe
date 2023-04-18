import React, {Component} from 'react';
import {getColorBrightness} from "../tools";
import {withTranslation} from "react-i18next";

class LicenseBadge extends Component {
    getColor(state){
        switch (state){
            case "UPCOMING":
                return "#c90d0d"
            case "UNOFFICIAL":
                return "#0d33c9"
            case "OFFICIAL":
                return "#0dc910"
        }
    }
    getLabel(state){
        switch (state){
            case "UPCOMING":
                return this.props.t("Upcoming")
            case "UNOFFICIAL":
                return this.props.t("Unofficial")
            case "OFFICIAL":
                return this.props.t("Official")
        }
    }
    render() {
        return (
            <React.Fragment>
                <span className="badge font-size-14" style={{background: this.getColor(this.props.state),color:getColorBrightness(this.props.color)}}>
                    {this.getLabel(this.props.state)}
                </span>
            </React.Fragment>
        );
    }
}

export default (withTranslation()(LicenseBadge));
import React, {Component} from 'react';
import {getColorBrightness} from "../tools";

class LicenseBadge extends Component {
    render() {
        return (
            <React.Fragment>
                <span className="badge font-size-14" style={{background: this.props.color,color:getColorBrightness(this.props.color)}}>
                    {this.props.name}
                </span>
            </React.Fragment>
        );
    }
}

export default LicenseBadge;
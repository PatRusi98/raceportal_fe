import React, {Component} from 'react';
import Select from "react-select";
import {SimOption, SingleValue} from "../Common/SelectTools";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addCarClass, createCarClass, deleteCarClass, removeCarClass, updateCarClass} from "../../store/series/actions";
import {getAllScoring} from "../../store/scoring/actions";
import {getAllCars} from "../../store/car/actions";
import {withTranslation} from "react-i18next";

class CarSelector extends Component {
    render() {
        return (
                <div className="mb-3 select2-container">
                    <label className="control-label">
                        {this.props.t("Available cars")}
                    </label>
                    <Select
                        name="availableCars"
                        isMulti={true}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={this.props.options}
                        classNamePrefix="select2-selection"
                        components={{SingleValue}}
                    />
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};
export default withRouter(
    connect(mapStateToProps, {})(withTranslation()(CarSelector))
);
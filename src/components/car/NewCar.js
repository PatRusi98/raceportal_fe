import React, {Component} from 'react';
import {Button, Col, Input, Modal, Row} from "reactstrap";
import {Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AvField, AvForm} from "availity-reactstrap-validation"
import acc from "../../assets/images/sims/acc.png";
import rre from "../../assets/images/sims/rre.png";
import Select, {components} from "react-select"
import {createSeries} from "../../store/series/actions";
import {createCar} from "../../store/car/actions";
import {SingleValue,SimOption} from "../Common/SelectTools";

class NewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            simulator:{value:"ACC"}
        }
    }

    toggle = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    handleValidSubmit = (event, values) => {
        let session = {...values,simulator:this.state.simulator.value}
        this.props.createCar(session)
        this.toggle()
    }

    changeSimulator = (value)=>{
        this.setState({
            simulator:value
        })
    }

    render() {
        return (
            <div>
                <Button color={"info"} onClick={this.toggle}>{this.props.t("New car")}</Button>
                <Modal isOpen={this.state.openModal} size={"lg"} toggle={this.toggle} centered backdrop>
                    <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">
                                {this.props.t("New car")}
                            </h5>
                            <button
                                type="button"
                                onClick={this.toggle}
                                className="close"
                                data-dismiss="modal"
                                aria-label={this.props.t("Close")}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <Col md={4}>
                                    <div className="mb-3 select2-container">
                                        <label className="control-label">
                                            {this.props.t("Simulator")}
                                        </label>
                                        <Select
                                            name="simulator"
                                            isMulti={false}
                                            value={this.state.simulator}
                                            onChange={this.changeSimulator}
                                            options={[{value: "ACC"}, {value: "RRE"},{value: "RF2"}]}
                                            classNamePrefix="select2-selection"
                                            components={{Option:SimOption, SingleValue}}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <AvField name="name"
                                             label={this.props.t("Name")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter name")}
                                             type="text"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a name'
                                                 },
                                                 minLength: {
                                                     value: 3,
                                                     errorMessage: 'Name must be between 3 and 255 characters'
                                                 },
                                                 maxLength: {
                                                     value: 255,
                                                     errorMessage: 'Name must be between 3 and 255 characters'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={2}>
                                    <AvField name="model"
                                             label={this.props.t("Model No.")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter model")}
                                             type="text"
                                             validate={{
                                                 maxLength: {
                                                     value: 255,
                                                     errorMessage: 'Model must be max 255 characters long'
                                                 }
                                             }}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="modal-footer">
                            <Button color={"success"} type={"submit"}>{this.props.t("Save")}</Button>
                            <Button color={"secondary"} onClick={this.toggle}>{this.props.t("Cancel")}</Button>
                        </div>
                    </AvForm>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

export default withRouter(
    connect(mapStateToProps, {createCar})(withTranslation()(NewCar))
);
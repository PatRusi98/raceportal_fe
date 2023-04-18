import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {Button, Col, Modal, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";
import {addResultPenalty, createEvent} from "../../store/event/actions";

class AddPenalty extends Component {
    constructor(props) {
        super(props);
        this.state={
            openModal:false,
            description:""
        }
    }

    toggle = () => {
        console.log(this.props.result)
        this.setState({
            openModal: !this.state.openModal
        })
    }

    handleValidSubmit = (e, values) => {
        if (values.type===undefined || values.type===""){
            values.type="ACTUAL_RACE"
        }
        values.value=Number(values.value)*1000
        let penalty = {...values,sessionId:this.props.sessionId,eventId:this.props.eventId,id:this.props.result.id}
        this.props.addResultPenalty(penalty)
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button
                    color={"danger"}
                    onClick={this.toggle}
                    size={"sm"}>
                    <i className={"mdi mdi-plus"} />
                </Button>
                <Modal isOpen={this.state.openModal} size={"lg"} toggle={this.toggle} centered backdrop>
                    <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">
                                {this.props.t("Add Penalty")}
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
                                <Col md={12}>
                                    <AvField name="penalty"
                                             label={this.props.t("Penalty")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter penalty")}
                                             type="textarea"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a penalty'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={12}>
                                    <AvField name="reason"
                                             label={this.props.t("Reason")}
                                             className="form-control"
                                             type="textarea"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a reason'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField name="violationLap"
                                             label={this.props.t("Lap")}
                                             className="form-control"
                                             type="number"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a lap'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField name="type"
                                             label={this.props.t("Penalty type")}
                                             className="form-control"
                                             type="select"
                                    >
                                        <option value={"ACTUAL_RACE"}>{this.props.t("Time to race")}</option>
                                        <option disabled value={"NEXT_RACE"}>{this.props.t("Penalty to next race")}</option>
                                    </AvField>
                                </Col>
                                <Col md={4}>
                                    <AvField name="value"
                                             label={this.props.t("Value")+" [s]"}
                                             className="form-control"
                                             type="number"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a value'
                                                 }
                                             }}
                                             required
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
    return {
    }
};

export default withRouter(
    connect(mapStateToProps, {addResultPenalty})(withTranslation()(AddPenalty))
);
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {Button, Col, Modal, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";
import {createEvent} from "../../store/event/actions";

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state={
            openModal:false,
            description:""
        }
    }

    toggle = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }
    handleChangeDesc = (event, editor) => {
        this.setState({
            description: editor.getData()
        })
    }

    handleValidSubmit = (e, values) => {

        let event = {...values,description:this.state.description,seriesId:this.props.seriesId}
        this.props.createEvent(event)
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button
                    color={"success"}
                    onClick={this.toggle}
                    size={"sm"}>
                    <i className={"mdi mdi-plus"} />
                    {this.props.t("Add event")}
                </Button>
                <Modal isOpen={this.state.openModal} size={"lg"} toggle={this.toggle} centered backdrop>
                    <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">
                                {this.props.t("New event")}
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
                                <Col md={4}>
                                    <AvField name="practiceStart"
                                             label={this.props.t("Practice start")}
                                             className="form-control"
                                             type="datetime-local"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a date'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField name="qualifyStart"
                                             label={this.props.t("Qualification start")}
                                             className="form-control"
                                             type="datetime-local"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a date'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={4}>
                                    <AvField name="raceStart"
                                             label={this.props.t("Race start")}
                                             className="form-control"
                                             type="datetime-local"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a date'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col>
                                    <label className="control-label">
                                        {this.props.t("Description")}
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={this.handleChangeDesc}
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
    connect(mapStateToProps, {createEvent})(withTranslation()(AddEvent))
);
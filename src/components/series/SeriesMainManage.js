import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries, updateSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from "ckeditor5-build-classic-dna";
import Select from "react-select";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {SingleValue,SimOption} from "../Common/SelectTools";


class SeriesMainManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props.series.description,
            rules: this.props.series.rules,
            simulator: {value: this.props.series.simulator}
        }

    }

    componentDidMount() {
        this.setState({
            description: this.props.series.description,
            rules: this.props.series.rules,
            simulator: {value: this.props.series.simulator}
        })
    }

    handleChangeDesc = (event, editor) => {
        this.setState({
            description: editor.getData()
        })
    }
    handleChangeRules = (event, editor) => {
        this.setState({
            rules: editor.getData()
        })
    }
    save = (event, values) => {
        let data = {
            ...this.props.series, ...values,
            description: this.state.description,
            rules: this.state.rules,
            simulator: this.state.simulator.value
        }
        this.props.updateSeries(data)
    }

    changeSimulator = (value) => {
        this.setState({
            simulator: value
        })
    }

    render() {
        return (
            <React.Fragment>
                <AvForm className="form-horizontal" onValidSubmit={this.save}>
                    <Row>
                        <Col md={3}>
                            <div className="mb-3 select2-container">
                                <label className="control-label">
                                    {this.props.t("Simulator")}
                                </label>
                                <Select
                                    name="simulator"
                                    isMulti={false}
                                    value={this.state.simulator}
                                    onChange={this.changeSimulator}
                                    options={[{value: "ACC"}, {value: "RRE"}]}
                                    classNamePrefix="select2-selection"
                                    components={{Option:SimOption, SingleValue}}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <AvField name="name"
                                     label={this.props.t("Name")}
                                     value={this.props.series.name}
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
                        <Col md={3}>
                            <AvField name="code"
                                     label={this.props.t("Code")}
                                     className="form-control"
                                     value={this.props.series.code}
                                     placeholder={this.props.t("Enter code")}
                                     type="text"
                                     validate={{
                                         required: {
                                             value: true,
                                             errorMessage: 'Please enter a code'
                                         },
                                         minLength: {
                                             value: 3,
                                             errorMessage: 'Code must be between 3 and 10 characters'
                                         },
                                         maxLength: {
                                             value: 10,
                                             errorMessage: 'Code must be between 3 and 10 characters'
                                         }
                                     }}
                                     required
                            />
                        </Col>
                        <Col md={3}>
                            <AvField name="state"
                                     label={this.props.t("State")}
                                     className="form-control"
                                     value={this.props.series.state}
                                     type="select"
                                     required
                            >
                                <option value={"PREPARING"}>{this.props.t("Preparing")}</option>
                                <option value={"FINISHED"}>{this.props.t("Finished")}</option>
                                <option value={"ACTIVE"}>{this.props.t("Active")}</option>
                            </AvField>
                        </Col>
                        <Col md={3}>
                            <AvField name="registrations"
                                     label={this.props.t("Registrations")}
                                     className="form-control"
                                     value={this.props.series.registrations + ""}
                                     type="select"
                            >
                                <option value={"true"}>{this.props.t("Open")}</option>
                                <option value={"false"}>{this.props.t("Closed")}</option>
                            </AvField>
                        </Col>
                        <Col md={3}>
                            <AvField name="color"
                                     style={{minHeight:"36px"}}
                                     label={this.props.t("Color")}
                                     className="form-control"
                                     value={this.props.series.color}
                                     type="color"
                            />

                        </Col>
                        <Col md={3}>
                            <AvField name="multiclass"
                                     label={this.props.t("Multiclass")}
                                     value={this.props.series.multiclass+""}
                                     className="form-control"
                                     type="select"

                            >
                                <option value={"true"}>{this.props.t("Yes")}</option>
                                <option value={"false"}>{this.props.t("No")}</option>
                            </AvField>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <label className="control-label">
                                {this.props.t("Description")}
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.props.series.description || ""}
                                onChange={this.handleChangeDesc}
                            />
                        </Col>
                        <Col md={12} className={"mt-2"}>
                            <label className="control-label">
                                {this.props.t("Rules")}
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.props.series.rules || ""}
                                onChange={this.handleChangeRules}

                            />
                        </Col>
                    </Row>
                    <div className="text-end mt-2">
                        <Button color={"success"} type={"submit"}>{this.props.t("Save")}</Button>
                    </div>
                </AvForm>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail
    }
};
export default withRouter(
    connect(mapStateToProps, {updateSeries})(withTranslation()(SeriesMainManage))
);
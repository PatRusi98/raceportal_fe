import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries, updateSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, FormGroup, Input, InputGroup, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from "react-select";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {SingleValue, Option} from "./NewSeries";
import * as PropTypes from "prop-types";

class SeriesEntriesManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            availableCars:this.props.series.availableCars||[],
            availableCarInput:""
        }

    }
    componentDidMount() {
        this.setState({
            availableCars:this.props.series.availableCars||[]
        })
    }

    save = (event, values) => {
        let data = {
            ...this.props.series,
            ...values,
            availableCars: this.state.availableCars
        }
        this.props.updateSeries(data)
    }

    handleAvailableCarInput = (e) =>{
        this.setState({
            availableCarInput:e.target.value
        })
    }

    addCar =()=>{
        let cars = this.state.availableCars;
        cars.push(this.state.availableCarInput)

        this.setState({
            availableCars:cars,
            availableCarInput:""
        })
    }
    changeCar=(e, index)=>{
        let cars = this.state.availableCars;
        cars[index]=e.target.value
        this.setState({
            availableCars:cars,
            availableCarInput:""
        })
    }
    removeCar=(index)=>{
        let cars = this.state.availableCars;
        cars.splice(index,1)
        this.setState({
            availableCars:cars,
            availableCarInput:""
        })
    }

    render() {
        return (
            <React.Fragment>
                <AvForm className="form-horizontal" onValidSubmit={this.save}>
                    <Row>
                        <Col md={3}>
                            <AvField name="teamsEnable"
                                     label={this.props.t("Enable teams")}
                                     value={this.props.series.teamsEnable+""}
                                     className="form-control"
                                     type="select"

                            >
                                <option value={"true"}>{this.props.t("Yes")}</option>
                                <option value={"false"}>{this.props.t("No")}</option>
                            </AvField>
                        </Col>
                        <Col md={3}>
                            <AvField name="maxTeamCars"
                                     label={this.props.t("Max teams cars")}
                                     value={this.props.series.maxTeamCars}
                                     className="form-control"
                                     type="number"

                            />
                        </Col>
                        <Col md={3}>
                            <AvField name="maxDriversInCar"
                                     label={this.props.t("Max drivers per car")}
                                     value={this.props.series.maxDriversInCar}
                                     className="form-control"
                                     type="number"

                            />
                        </Col>
                        <Col md={3}>
                            <AvField name="maxEntries"
                                     label={this.props.t("Max entries")}
                                     value={this.props.series.maxEntries}
                                     className="form-control"
                                     type="number"

                            />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md={12}>
                            <label>{this.props.t("Available Cars")}</label>
                        </Col>
                        {this.state.availableCars.map((car, index)=>
                        <Col md={12} key={index} className={"mb-2"}>
                            <InputGroup>
                                <Input value={car} onChange={(e)=>this.changeCar(e,index)} />
                                    <Button color={"danger"} onClick={()=>this.removeCar(index)}>Delete</Button>
                            </InputGroup>
                        </Col>
                        )}
                        <Col md={12}>
                            <InputGroup>
                                <Input type={"text"} value={this.state.availableCarInput} onChange={this.handleAvailableCarInput} />
                                    <Button color={"success"} onClick={this.addCar}>Add</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr/>
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
    connect(mapStateToProps, {updateSeries})(withTranslation()(SeriesEntriesManage))
);
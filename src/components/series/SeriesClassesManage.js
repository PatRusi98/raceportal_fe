import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    addCarClass,
    createCarClass,
    deleteCarClass,
    deleteSeries,
    getAllSeries, removeCarClass,
    updateCarClass,
    updateSeries
} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Alert, Button, Col, FormGroup, Input, InputGroup, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from "ckeditor5-build-classic-dna";
import Select from "react-select";
import {AvField, AvForm, AvInput} from "availity-reactstrap-validation";
import * as PropTypes from "prop-types";
import {getAllScoring} from "../../store/scoring/actions";
import {getAllCars} from "../../store/car/actions";
import {SingleValue} from "../Common/SelectTools";
import CarSelector from "./CarSelector";
import {createOptionsFromCars, makeListIdsFromOptions} from "../tools";

class SeriesClassesManage extends Component {

    constructor(props) {
        super(props);

        let classes = this.props.series.classes
        classes.forEach((carClass)=>{
            carClass.availableCars = createOptionsFromCars(carClass.availableCars,this.props.series.simulator)
        })
        this.state={
            classes:classes
        }
    }

    componentDidMount() {
        if (this.props.scoring.length === 0) {
            this.props.getAllScoring()
        }
        if (this.props.cars.filter((car) => car.simulator === this.props.series.simulator).length === 0) {
            this.props.getAllCars()
        }
    }

    save = (event, values) => {
        let availableCar= makeListIdsFromOptions(this.state.classes.find((carClass=>carClass.id===Number(values.id))).availableCars||[])

        let data = {
            ...values,
            seriesId: Number(values.seriesId),
            id: Number(values.id),
            availableCars:availableCar
        }

        //console.log(data);

        if (data.id === 0) {
            this.props.createCarClass(data)
        } else {
            this.props.updateCarClass(data)
        }
    }

    changeAvailableCar=(value,index)=>{
        let classes=this.state.classes;
        classes[index].availableCars=value
        this.setState({
            classes:classes
        })
    }

    addClass = () => {
        this.props.addCarClass()
    }

    removeClass = (index) => {
        let carClass = this.props.series.classes[index]
        if (carClass.id > 0) {
            this.props.deleteCarClass({id: carClass.id})
        } else {
            this.props.removeCarClass({index: index})
        }
    }

    render() {
        //console.log(this.props.series)
        return (
            <React.Fragment>

                {this.props.series.classes.map((carClass, index) =>
                    <div key={index} style={{borderLeft: "10px solid" + carClass.color, paddingLeft: "10px"}}>
                        <AvForm className="form-horizontal" onValidSubmit={this.save}>
                            <Row>
                                <Col md={3}>
                                    <AvInput name={"id"}
                                             value={carClass.id}
                                             type="hidden"
                                             className="d-none"

                                    />
                                    <AvInput name={"seriesId"}
                                             value={this.props.series.id}
                                             type="hidden"
                                             className="d-none"

                                    />
                                    <AvField name={"name"}
                                             label={this.props.t("Name")}
                                             value={carClass.name}
                                             className="form-control"
                                             placeholder={this.props.t("Enter name")}
                                             type="text"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a class name'
                                                 },
                                                 minLength: {
                                                     value: 2,
                                                     errorMessage: 'Name must be between 2 and 8 characters'
                                                 },
                                                 maxLength: {
                                                     value: 8,
                                                     errorMessage: 'Name must be between 3 and 8 characters'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={3}>
                                    <AvField name={"color"}
                                             style={{minHeight: "36px"}}
                                             label={this.props.t("Color")}
                                             className="form-control"
                                             value={carClass.color}
                                             type="color"
                                    />
                                </Col>
                                <Col md={3}>
                                    <AvField name={"maxEntries"}
                                             label={this.props.t("Max entries")}
                                             value={carClass.maxEntries}
                                             className="form-control"
                                             type="number"

                                    />
                                </Col>
                                <Col md={3}>
                                    <AvField name={"scoringId"}
                                             label={this.props.t("Scoring")}
                                             value={carClass.scoring ? carClass.scoring.id : 0}
                                             className="form-control"
                                             placeholder={"Please Select"}
                                             type="select"
                                             required

                                    >
                                        <option value={false}>Choose</option>
                                        {this.props.scoring.map((scoring, index) =>
                                            <option key={index} value={scoring.id}>{scoring.name}</option>
                                        )}

                                    </AvField>
                                </Col>
                                <Col md={3}>
                                    <AvField name={"driversPerEntry"}
                                             label={this.props.t("No. drivers per entry")}
                                             value={carClass.driversPerEntry}
                                             className="form-control"
                                             type="number"

                                    />
                                </Col>
                                <Col md={3}>
                                    <AvField name="needSamsLicense"
                                             label={this.props.t("Mandatory SAMS license")}
                                             value={carClass.needSamsLicense||false+""}
                                             className="form-control"
                                             type="select"

                                    >
                                        <option value={"true"}>{this.props.t("Yes")}</option>
                                        <option value={"false"}>{this.props.t("No")}</option>
                                    </AvField>
                                </Col>
                                <Col md={3}>
                                    <AvField name="accCategoryId"
                                             label={this.props.t("ACC category")}
                                             value={carClass.accCategoryId||0}
                                             className="form-control"
                                             type="select"

                                    >
                                        <option value={0}>{this.props.t("Bronze")}</option>
                                        <option value={1}>{this.props.t("Silver")}</option>
                                        <option value={2}>{this.props.t("Gold")}</option>
                                        <option value={3}>{this.props.t("Platinum")}</option>
                                    </AvField>
                                </Col>
                                <Col md={12}>
                                    {(this.props.cars.filter((car) => car.simulator === this.props.series.simulator).length > 0) ?
                                        <CarSelector
                                            options={createOptionsFromCars(this.props.cars,this.props.series.simulator)}
                                            value={(this.state.classes[index].availableCars||[])}
                                            onChange={(value)=>this.changeAvailableCar(value,index)}
                                        />
                                        :
                                        <Alert
                                            color={"warning"}>{this.props.t("Please set cars for series in settings")}</Alert>
                                    }
                                </Col>
                            </Row>

                            <div className="text-end mt-2">
                                <Button color={"success"} type={"submit"}>{this.props.t("Save")}</Button>
                                {this.props.series.classes.length > 1 &&
                                <Button color={"danger"} type={"button"}
                                        onClick={() => this.removeClass(index)}>{this.props.t("Remove")}</Button>
                                }
                            </div>
                        </AvForm>
                        <hr/>
                    </div>
                )}
                <div className="text-center mt-2">
                    {this.props.series.multiclass &&
                    <Button color={"info"} type={"button"}
                            onClick={(this.addClass)}>{this.props.t("Add class")}</Button>}

                </div>


            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail,
        scoring: state.Scoring.allScoring,
        cars: state.Car.allCars
    }
};
export default withRouter(
    connect(mapStateToProps, {
        updateCarClass,
        createCarClass,
        deleteCarClass,
        getAllScoring,
        addCarClass,
        removeCarClass,
        getAllCars
    })(withTranslation()(SeriesClassesManage))
);
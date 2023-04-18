import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {editUser} from "../../store/auth/actions";
import {withTranslation} from "react-i18next";
import {Alert, Button, Col, Input, Row} from "reactstrap";
import {registerEntry} from "../../store/entry/actions";
import Select from "react-select";
import {SingleValue} from "../Common/SelectTools";
import DriverLabel from "./DriverLabel";
import {getAllUsers} from "../../store/user/actions";

class EntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClass: undefined,
            selectedCar: undefined,
            selectedFile: null,
            fullClassError: false,
            samsLicenseError: false,
            existingNumberError: false,
            imageError: false,
            selectedDrivers: []
        }
    }

    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });

    };

    componentDidMount() {
        //console.log(this.props.series);
        this.setState({
            selectedClass: this.props.series.classes.length > 0 ? this.props.series.classes[0].id : 0,
            selectedCar: this.props.series.classes[0].availableCars.length > 0 ? this.props.series.classes[0].availableCars[0].id : 0,
            selectedDrivers: [this.props.user.id]
        })
        this.props.getAllUsers();

    }

    handleValidSubmit = (event, values) => {
        let carClassId = values.class || this.state.selectedClass
        //console.log(carClassId)
        //1048576
        //console.log(this.state.selectedFile.size)
        const formData = new FormData();
        formData.append('livery', this.state.selectedFile);
        formData.append('carClass', carClassId);
        formData.append('car', values.car || this.state.selectedCar);
        formData.append('drivers', this.state.selectedDrivers);
        formData.append('team', values.team);
        formData.append('number', values.number);

        if (this.state.selectedFile.size > 900000) {

            this.setState({
                imageError: true,
                existingNumberError: false,
                fullClassError: false,
                samsLicenseError: false
            })
            return;

        }
        if (this.checkNumbers(values.number)) {
            this.setState({
                existingNumberError: true,
                fullClassError: false,
                samsLicenseError: false,
                imageError: false
            })
            return;
        }

        let activeClass = this.props.series.classes.filter((carClass, index) => carClass.id === Number(carClassId))
        activeClass = activeClass[0]

        if (this.checkClassSize(carClassId) >= Number(activeClass.maxEntries)) {
            this.setState({
                fullClassError: true,
                existingNumberError: false,
                samsLicenseError: false,
                imageError: false
            })
            return;
        }

        if (activeClass.needSamsLicense && this.props.user.licenseSams === "") {
            this.setState({
                samsLicenseError: true,
                fullClassError: false,
                existingNumberError: false,
                imageError: false
            })
            return;
        }


        this.props.registerEntry(this.props.series, formData)
        this.form && this.form.reset();

        this.setState({
            selectedDrivers: [this.props.user.id],
            existingNumberError: false,
            fullClassError: false,
            samsLicenseError: false,
            imageError: false
        })
    }

    checkNumbers(number) {
        let exist = false
        this.props.entries.forEach(entry => {
            if (Number(entry.number) === Number(number) && entry.state !== "BANNED" && entry.state !== "CANCELED") {
                exist = true
            }
        })
        return exist;
    }

    checkClassSize(carClassId) {
        let number = 0
        this.props.entries.forEach(entry => {
            if (Number(entry.carClass.id) === Number(carClassId) && entry.state !== "BANNED" && entry.state !== "CANCELED") {
                number++
            }
        })
        return number;
    }

    getUsersValue() {
        let result = [];
        this.state.selectedDrivers.forEach((driver) => {
            let fdriver = this.props.users.find(user => user.id === Number(driver))
            if (fdriver) {
                result.push({value: fdriver.id, label: fdriver.name})
            }
        })
        return result
    }

    getUsersOptions() {
        let result = [];
        this.props.users.map((driver) => {
            result.push({value: driver.id, label: driver.name})
        })
        return result
    }

    onDriversChange = (values) => {
        let max = this.props.series.classes.find((carClass) => carClass.id === this.state.selectedClass).driversPerEntry;

        //console.log(values)
        if (values.length > Number(max)) {
            return;
        }
        let result = [];

        values.forEach(driver => {
            result.push(driver.value)
        })
        if (!result.includes(this.props.user.id)) {
            result.push(this.props.user.id)
        }

        this.setState({
            selectedDrivers: result
        })
    }


    render() {
        if (!this.state.selectedClass) {
            return <div>loading</div>
        }
        let activeClass = this.props.series.classes.filter((carClass, index) => carClass.id === this.state.selectedClass)
        activeClass = activeClass[0]

        return (
            <React.Fragment>
                <h3>{this.props.t("Registration")}</h3>
                {this.props.series.registrations ?
                    <React.Fragment>
                        {this.props.user.steam_id===null || this.props.user.steam_id===undefined || this.props.user.steam_id===""?
                            <Link to={"/profile"}>
                            <Alert color="danger">{this.props.t("Please add your Steam id in your profile")}</Alert></Link>
                            :
                        <AvForm className="form-horizontal"
                                onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>
                            <Row>
                                <Col md={12}>
                                    {this.state.samsLicenseError ?
                                        <Alert
                                            color="danger">{this.props.t("You need to add SAMS license in your profile")}</Alert> : null}
                                    {this.state.fullClassError ?
                                        <Alert color="danger">{this.props.t("Selected class is full")}</Alert> : null}
                                    {this.state.existingNumberError ?
                                        <Alert color="danger">{this.props.t("Number is in use")}</Alert> : null}
                                    {this.state.imageError ?
                                        <Alert
                                            color="danger">{this.props.t("Max filesize for livery is 800kB")}</Alert> : null}
                                </Col>
                                <Col md={3}>
                                    <AvField name="class"
                                             onChange={(e) => this.setState({
                                                 selectedClass: Number(e.target.value),
                                                 fullClassError: false
                                             })}
                                             label={this.props.t("Class")}
                                             className="form-control"
                                             type="select"

                                    >
                                        {this.props.series.classes && this.props.series.classes.map((carClass, index) => {
                                            return <option key={index}
                                                           value={carClass.id}>{carClass.name} {carClass.needSamsLicense ? "(" + this.props.t("Need SAMS license") + ")" : ""}</option>
                                        })}
                                    </AvField>
                                </Col>
                                <Col md={3}>
                                    <AvField name="car"
                                             label={this.props.t("Car")}
                                             className="form-control"
                                             type="select"

                                    >
                                        {activeClass.availableCars && activeClass.availableCars.map((car, index) => {
                                            return <option key={index} value={car.id}>{car.name}</option>
                                        })}
                                    </AvField>
                                </Col>
                                <Col md={4}>
                                    <AvField name="team"
                                             label={this.props.t("Team name")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter team name")}
                                             type="text"
                                             required
                                    />
                                </Col>
                                <Col md={2}>
                                    <AvField name="number"
                                             label={this.props.t("Number")}
                                             className="form-control"
                                             max={999}
                                             min={1}
                                             type="number"
                                             required
                                    />
                                </Col>
                                {activeClass.driversPerEntry && activeClass.driversPerEntry > 1 ?
                                    <Col md={12}>
                                        <div className="mb-3 select2-container">
                                            <label className="control-label">
                                                {this.props.t("Drivers")}
                                            </label>
                                            <Select
                                                name="drivers"
                                                max={3}
                                                value={this.getUsersValue()}
                                                isMulti={true}
                                                onChange={this.onDriversChange}
                                                options={this.getUsersOptions()}
                                                classNamePrefix="select2-selection"
                                            />
                                        </div>
                                    </Col> :
                                    <Col md={12} className={"mb-2"}>
                                        <label className="control-label">
                                            {this.props.t("Driver")}
                                        </label>
                                        <div className={"form-control"}>
                                            <DriverLabel driver={this.props.user}/>
                                        </div>
                                    </Col>
                                }
                                <Col md={12}>
                                    <AvField name="livery"
                                             label={this.props.t("Livery") + "(max 800kB)"}
                                             className="form-control"
                                             type="file"
                                             onChange={this.onFileChangeHandler}
                                             accept="image/gif, image/jpeg, image/png"
                                             required
                                    />
                                    {/*<label htmlFor="livery" className="form-label">Livery</label>*/}
                                    {/*<Input required type="file" className="form-control" onChange={this.onFileChangeHandler}/>*/}
                                </Col>
                                <Col md={12} className={"text-end mt-2"}>
                                    <Button color={"success"}>{this.props.t("Register")}</Button>
                                </Col>
                            </Row>

                        </AvForm>}
                    </React.Fragment>
                    :
                    <p>{this.props.t("Registrations are closed at this moment")}</p>
                }
                <hr/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail,
        user: state.Auth.user,
        users: state.User.allUsers,
        entries: state.Entry.entries,
    }
};

export default withRouter(
    connect(mapStateToProps, {registerEntry, getAllUsers})(withTranslation()(EntryForm))
);
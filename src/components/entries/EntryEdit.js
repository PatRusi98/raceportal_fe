import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {editUser} from "../../store/auth/actions";
import {withTranslation} from "react-i18next";
import {Alert, Button, Col, Input, Row} from "reactstrap";
import {editEntry, getEntry, registerEntry} from "../../store/entry/actions";
import Select from "react-select";
import {SingleValue} from "../Common/SelectTools";
import DriverLabel from "./DriverLabel";
import {getAllUsers} from "../../store/user/actions";
import {ADMIN} from "../Role";

class EntryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClass: undefined,
            selectedCar: undefined,
            selectedFile: null,
            fullClassError: false,
            samsLicenseError: false,
            existingNumberError: false,
            selectedDrivers: []
        }
    }

    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });

    };

    componentDidMount() {
        let drivers=[];
        this.props.entry.drivers.forEach((driver)=>{
            drivers.push(driver.id)
        })
        this.setState({
            selectedClass: this.props.entry.carClass.id,
            selectedCar: this.props.entry.car.id,
            selectedDrivers: drivers
        })
        this.props.getAllUsers();

    }

    handleValidSubmit = (event, values) => {
        let activeClass = this.props.series.classes.filter((carClass, index) => carClass.id === this.state.selectedClass)
        activeClass = activeClass[0]
        let drivers = this.state.selectedDrivers;

        let data = {...values,drivers:drivers,id:this.props.entry.id}


        if(this.checkNumbers(values.number)){
            this.setState({
                existingNumberError:true,
                fullClassError:false,
                samsLicenseError:false
            })
            return;
        }


        if(this.checkClassSize(Number(this.state.selectedClass))>=Number(activeClass.maxEntries)){
            this.setState({
                fullClassError:true,
                existingNumberError:false,
                samsLicenseError:false
            })
            return;
        }

        if(activeClass.needSamsLicense && this.props.user.licenseSams===""){
            this.setState({
                samsLicenseError:true,
                fullClassError:false,
                existingNumberError:false
            })
            return;
        }

        this.props.editEntry(this.props.series, data,this.props.history)

    }

    getUsersValue(){
        let result=[];
        this.state.selectedDrivers.forEach((driver)=>{
            let fdriver = this.props.users.find(user=>user.id===Number(driver))
            if(fdriver) {
                result.push({value: fdriver.id, label: fdriver.name})
            }
        })
        return result
    }

    getUsersOptions(){
        let result=[];
        this.props.users.map((driver)=>{
            result.push({value:driver.id,label:driver.name})
        })
        return result
    }
    onDriversChange=(values)=>{
        let result=[];
        values.forEach(driver=>{
            result.push(driver.value)
        })
        if(!result.includes(this.props.user.id)){
            result.push(this.props.user.id)
        }
        this.setState({
            selectedDrivers:result
        })
    }

    checkNumbers(number){
        let exist=false
        if(Number(this.props.entry.number)===Number(number)){
            return exist
        }
        this.props.entries.forEach(entry=>{
            if(Number(entry.number)===Number(number) && entry.state!=="BANNED" && entry.state!=="CANCELED"){
                exist = true
            }
        })

        return exist;
    }

    checkClassSize(carClassId){
        let number=0
        this.props.entries.forEach(entry=>{
            if(Number(entry.carClass.id)===Number(carClassId) && entry.state!=="BANNED" && entry.state!=="CANCELED"){
                number++
            }
        })
        if(Number(this.props.entry.carClass.id)===Number(carClassId)){
            number--;
        }
        return number;
    }

    render() {
        if (!this.state.selectedClass) {
            return <div>loading</div>
        }
        let activeClass = this.props.series.classes.filter((carClass, index) => carClass.id === this.state.selectedClass)
        activeClass = activeClass[0]
        return (
            <React.Fragment>
                <h3>{this.props.t("Edit registratrion")}</h3>
                    <AvForm className="form-horizontal"
                            onValidSubmit={this.handleValidSubmit} ref={c => (this.form = c)}>
                        <Row>
                            <Col md={12}>
                                {this.state.samsLicenseError?
                                    <Alert color="danger">{this.props.t("You need to add SAMS license in your profile")}</Alert>:null}
                                {this.state.fullClassError?
                                    <Alert color="danger">{this.props.t("Selected class is full")}</Alert>:null}
                                {this.state.existingNumberError?
                                    <Alert color="danger">{this.props.t("Number is in use")}</Alert>:null}
                            </Col>
                            <Col md={3}>
                                <AvField name="carClass"
                                         value={this.props.entry.carClass.id}
                                         onChange={(e) => this.setState({selectedClass: Number(e.target.value)})}
                                         label={this.props.t("Class")}
                                         className="form-control"
                                         type="select"
                                >
                                    {this.props.series.classes && this.props.series.classes.map((carClass, index) => {
                                        return <option key={index} value={carClass.id}>{carClass.name} {carClass.needSamsLicense?"("+this.props.t("Need SAMS license")+")":""}</option>
                                    })}
                                </AvField>
                            </Col>
                            <Col md={3}>
                                <AvField name="car"
                                         value={this.props.entry.car.id}
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
                                         value={this.props.entry.team}
                                         label={this.props.t("Team name")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter team name")}
                                         type="text"
                                         required
                                />
                            </Col>
                            <Col md={2}>
                                <AvField name="number"
                                         value={this.props.entry.number}
                                         label={this.props.t("Number")}
                                         className="form-control"
                                         max={999}
                                         min={1}
                                         type="number"
                                         required
                                />
                            </Col>
                            {activeClass.driversPerEntry && activeClass.driversPerEntry > 1 ?
                                <Col md={10}>
                                    <div className="mb-3 select2-container">
                                        <label className="control-label">
                                            {this.props.t("Drivers")}
                                        </label>
                                        <Select
                                            name="drivers"
                                            value={this.getUsersValue()}
                                            isMulti={true}
                                            onChange={this.onDriversChange}
                                            options={this.getUsersOptions()}
                                            classNamePrefix="select2-selection"
                                        />
                                    </div>
                                </Col> :
                                <Col md={10} className={"mb-2"}>
                                    <label className="control-label">
                                        {this.props.t("Driver")}
                                    </label>
                                    <div className={"form-control"}>
                                        <DriverLabel driver={this.props.entry.drivers[0]}/>
                                    </div>
                                </Col>
                            }
                            {this.props.user.role===ADMIN?
                            <Col md={2}>
                                <AvField name="state"
                                         value={this.props.entry.state}
                                         label={this.props.t("State")}
                                         className="form-control"
                                         type="select"
                                         required
                                >
                                    <option value={"WAITING"}>{this.props.t("WAITING")}</option>
                                    <option value={"APPROVED"}>{this.props.t("APPROVED")}</option>
                                    <option value={"BANNED"}>{this.props.t("BANNED")}</option>
                                    <option value={"CANCELED"}>{this.props.t("CANCELED")}</option>
                                </AvField>
                            </Col>:
                                <AvField name="state"
                                         value={this.props.entry.state}
                                         className="form-control"
                                         type="hidden"
                                         required
                                />
                            }
                            <Col md={12} className={"text-end mt-2"}>
                                <Button color={"success"} className={"me-1"}>{this.props.t("Save")}</Button>
                            </Col>
                        </Row>

                    </AvForm>

                <hr/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        entry: state.Entry.entry,
        entries: state.Entry.entries,
        series: state.Series.seriesDetail,
        user: state.Auth.user,
        users: state.User.allUsers
    }
};

export default withRouter(
    connect(mapStateToProps, {editEntry,getAllUsers,getEntry})(withTranslation()(EntryEdit))
);
import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col} from "reactstrap";
import {editEntry} from "../../store/entry/actions";

class DeleteSeriesButton extends Component {

    constructor(props) {
        super(props);
        this.state={
            showConfirm:false
        }
    }

    toggle = ()=>{
        this.setState({
            showConfirm:!this.state.showConfirm
        })
    }
    delete=()=>{
        let drivers=[]
        this.props.entry.drivers.forEach(driver=>{
            drivers.push(driver.id)
        })
        let data = {...this.props.entry,drivers:drivers,carClass:this.props.entry.carClass.id,car:this.props.entry.car.id,state:"CANCELED"}
        this.props.editEntry(this.props.series, data,this.props.history)
    }
    renew=()=>{
        let drivers=[]
        this.props.entry.drivers.forEach(driver=>{
            drivers.push(driver.id)
        })
        let data = {...this.props.entry,drivers:drivers,carClass:this.props.entry.carClass.id,car:this.props.entry.car.id,state:"WAITING"}
        this.props.editEntry(this.props.series, data,this.props.history)
    }
    render() {
        if(this.props.entry.state==="BANNED") {
            return (null)
        }else if(this.props.entry.state==="WAITING" || this.props.entry.state==="APPROVED") {
            return (
                <React.Fragment>
                    <Col md={12}>
                        <h3>{this.props.t("Logout from series")}</h3>
                        <div className={"text-end"}>


                    <Button onClick={this.toggle} title={this.props.t("Logout")}
                            className={"btn btn-danger "}>{this.props.t("Logout from series")}</Button>
                    {this.state.showConfirm ? (
                        <SweetAlert
                            title={this.props.t("Are you sure?")}
                            warning
                            showCancel
                            confirmBtnText={this.props.t("OK")}
                            cancelBtnText={this.props.t("Cancel")}
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            onConfirm={this.delete}
                            onCancel={this.toggle}
                            con
                        >
                            {this.props.t("You won't be able to revert this!")}

                        </SweetAlert>
                    ) : null}
                        </div>
                    </Col>
                </React.Fragment>
            );
        }else{
            return null;
            return(
                <Col md={12}>
                    <h3>{this.props.t("Renew registration")}</h3>
                    <div className={"text-end"}>
                <Button onClick={this.renew} title={this.props.t("Renew")}
                        className={"btn btn-info "}>{this.props.t("Renew registration")}</Button>
                    </div>
                </Col>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        entry:state.Entry.entry,
        series:state.Series.seriesDetail
    }
};
export default withRouter(
    connect(mapStateToProps, {editEntry})(withTranslation()(DeleteSeriesButton))
);
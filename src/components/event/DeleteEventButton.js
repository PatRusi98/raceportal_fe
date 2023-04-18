import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button} from "reactstrap";
import {deleteCar} from "../../store/car/actions";
import {deleteEvent} from "../../store/event/actions";

class DeleteEventButton extends Component {

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
        this.props.deleteEvent({id:this.props.id,seriesId:this.props.seriesId})
        this.toggle()
    }
    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggle} title={this.props.t("Delete")}
                        className={"btn btn-danger btn-sm "}><i
                    className={"mdi mdi-delete"}/></Button>
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
                    >
                        {this.props.t("You won't be able to revert this!")}

                    </SweetAlert>
                ) : null}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
    }
};
export default withRouter(
    connect(mapStateToProps, {deleteEvent})(withTranslation()(DeleteEventButton))
);
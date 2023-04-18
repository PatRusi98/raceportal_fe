import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane} from "reactstrap";
import AddEvent from "./AddEvent";
import {getSeriesEvents} from "../../store/event/actions";
import DeleteEventButton from "../event/DeleteEventButton";
import {ADMIN} from "../Role";
import moment from "moment";


class SeriesEvents extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        this.props.getSeriesEvents({id:this.props.series.id})
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    <Col md={12}>
                        <div className="table-responsive">
                            <Table
                                className="table table-hover table-stripped table-bordered mb-0">
                                <thead>
                                <tr>
                                    <th>{this.props.t("Name")}</th>
                                    <th >{this.props.t("Practice start")}</th>
                                    <th >{this.props.t("Qualification start")}</th>
                                    <th >{this.props.t("Race start")}</th>
                                    {this.props.user.role===ADMIN?
                                    <th width={80}>{this.props.t("Actions")}</th>:null}
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.events.map((event,index)=> {
                                    let dateRaceStart = new Date(event.raceStart);
                                    let dateQualifyStart = new Date(event.qualifyStart);
                                    let datePracticeStart = new Date(event.practiceStart);
                                    return(
                                        <tr key={index}>
                                            <td>
                                                <Link to={"/series/"+this.props.series.id+"/event/"+event.id}>{event.name}</Link>
                                            </td>
                                            <td>{moment(event.practiceStart).utc(false).format("D. M. yyyy")} - <b>{moment(event.practiceStart).utc(false).format("HH:mm")}</b></td>
                                            <td>{moment(event.qualifyStart).utc(false).format("D. M. yyyy")} - <b>{moment(event.qualifyStart).utc(false).format("HH:mm")}</b></td>
                                            <td>{moment(event.raceStart).utc(false).format("D. M. yyyy")} - <b>{moment(event.raceStart).utc(false).format("HH:mm")}</b></td>

                                            {this.props.user.role===ADMIN?
                                            <td><DeleteEventButton seriesId={this.props.series.id} id={event.id}/></td>:null}
                                        </tr>
                                    )}
                                )}
                                {this.props.user.role===ADMIN?
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <AddEvent seriesId={this.props.series.id}/>
                                    </td>
                                </tr>:null}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        series:state.Series.seriesDetail,
        events:state.Event.seriesEvents,
        user:state.Auth.user
    }
};
export default withRouter(
    connect(mapStateToProps, {getSeriesEvents})(withTranslation()(SeriesEvents))
);
import React, {Component} from 'react';
import {Button, Table} from "reactstrap";
import SimulatorColumn from "./SimulatorColumn";
import {Link, withRouter} from "react-router-dom";
import DeleteCarButton from "../car/DeleteCarButton";
import {connect} from "react-redux";
import {deleteSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import AddEvent from "./AddEvent";
import {getSeriesEvents} from "../../store/event/actions";

class SeriesEventsManage extends Component {

    componentDidMount() {
        if(this.props.events.length===0){
            this.props.getSeriesEvents({id:this.props.series.id})
        }
    }

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <Table
                        className="table table-hover table-stripped table-bordered mb-0">
                        <thead>
                            <tr>
                                <th >{this.props.t("Race start")}</th>
                                <th >{this.props.t("Qualification start")}</th>
                                <th>{this.props.t("Name")}</th>
                                <th width={80}>{this.props.t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.events.map((event,index)=> {
                            let dateRaceStart = new Date(event.raceStart);
                            let dateQualifyStart = new Date(event.qualifyStart);
                            return(
                            <tr key={index}>
                                <td>{dateRaceStart.toLocaleDateString()} <b>{dateRaceStart.toLocaleTimeString()}</b></td>
                                <td>{dateQualifyStart.toLocaleDateString()} <b>{dateRaceStart.toLocaleTimeString()}</b></td>
                                <td>{event.name}</td>
                                <td></td>
                            </tr>
                            )}
                        )}
                            <tr>
                                <td colSpan={4} className="text-center">
                                    <AddEvent seriesId={this.props.series.id}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        series:state.Series.seriesDetail,
        events:state.Event.seriesEvents
    }
};

export default withRouter(
    connect(mapStateToProps, {getSeriesEvents})(withTranslation()(SeriesEventsManage))
);
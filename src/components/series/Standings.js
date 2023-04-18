import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getStandings} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Col, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane} from "reactstrap";
import classnames from "classnames";
import SimulatorColumn from "./SimulatorColumn";
import DeleteCarButton from "../car/DeleteCarButton";
import DriverLabel from "../entries/DriverLabel";
import LicenseBadge from "../Licenses/LicenseBadge";

class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "tab0"
        }
    }
    componentDidMount() {

        this.props.getStandings(this.props.series)
    }
    toggle = (tab) => {
        this.setState({
            activeTab: tab
        })
    }

    render() {
        if(this.props.standings.standings===undefined){
            return <div>Loading</div>
        }
        return (
            <React.Fragment>
                <Row>
                    <Col md="3">
                        <Nav pills className="flex-column">
                            {this.props.standings.standings.map((standings, index)=>
                            <NavItem key={index}>
                                <NavLink
                                    style={{cursor: "pointer"}}
                                    className={classnames({
                                        'mb-2': true,
                                        active: this.state.activeTab === "tab"+index,
                                    })}
                                    onClick={() => this.toggle("tab"+index)}
                                >
                                    {this.props.t(standings.name)}
                                </NavLink>
                            </NavItem>
                            )}
                        </Nav>
                    </Col>
                    <Col md="9">
                        <TabContent activeTab={this.state.activeTab}  className="text-muted mt-4 mt-md-0">
                            {this.props.standings.standings.map((standings, index)=>
                            <TabPane key={index} tabId={"tab"+index}>
                                <div className={"table-responsive"}>
                                    <Table
                                        className="table table-hover table-stripped table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th width={50}>#</th>
                                            <th>{this.props.t("Drivers")}</th>
                                            <th>{this.props.t("Team name")}</th>
                                            <th>{this.props.t("Class")}</th>
                                            <th>{this.props.t("Car")}</th>
                                            {standings.events.map((event,index)=>{
                                                return <th width={50} key={index}>{event.code}</th>
                                            })}
                                            <th width={50}>{this.props.t("Total")}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {standings.rows.map((row,index)=>
                                            <tr key={index}>
                                                <td>{index+1}.</td>
                                                <td>
                                                    {row.drivers.map((driver,index)=>
                                                        <div  key={index}>
                                                    <DriverLabel driver={driver} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td>{row.team}</td>
                                                <td><LicenseBadge name={row.carClass.name} color={row.carClass.color} /></td>
                                                <td>{row.car.name}</td>
                                                {row.eventPoints.map((event,index)=>{
                                                    return <td key={index}>{event.points}</td>
                                                })}
                                                <td>{row.points}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </div>
                            </TabPane>
                            )}
                        </TabContent>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        series:state.Series.seriesDetail,
        standings:state.Series.standings
    }
};
export default withRouter(
    connect(mapStateToProps, {getStandings})(withTranslation()(Standings))
);
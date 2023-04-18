import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries,} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Alert, Button, Table} from "reactstrap";
import DriverLabel from "../entries/DriverLabel";
import LicenseBadge from "../Licenses/LicenseBadge";
import DeleteResultButton from "./DeleteResultButton";
import {ADMIN} from "../Role";
import PenaltyBlock from "./PenaltyBlock";
import AddPenealty from "../series/AddPenealty";


class ResultTable extends Component {

    lapTimeFormat(lapTime) {
        let mins = (lapTime / 1000) / 60;
        let secs = ((lapTime / 1000) % 60).toFixed(3);
        let secsSplit = secs.toString().split(".")
        let millis = secsSplit[1];
        secs = secsSplit[0];

        if (mins > 1) {
            mins = Math.floor(mins);
        } else {
            mins = 0;
        }

        if (secs < 10) {
            secs = "0" + secs;
        }

        if (millis != undefined) {
            return mins + ":" + secs + "." + millis;
        } else {
            return "ERROR";
        }
    }

    getLapsLabel(lapCount){
        if(lapCount===1){
            return this.props.t("lap")
        }
        if(lapCount>1 && lapCount<5){
            return this.props.t("laps")
        }
        if(lapCount>5){
            return this.props.t("laps2")
        }
    }

    render() {
        let bestLap=this.props.session.results[0].bestLap;
        let totalTime=this.props.session.results[0].totalTimeWithPenalties;
        let totalTimeRelative=this.props.session.results[0].totalTimeWithPenalties;
        let lapCount=this.props.session.results[0].lapCount;
        let winnerLastLap=this.props.session.results[0].lastLap;

        return (
            <React.Fragment>
                <div className={"table-responsive"}>
                    <Table
                        className="table table-hover table-stripped table-bordered mb-0">
                        <thead>
                        <tr>
                            <th width={50}>{this.props.t("Position")}</th>
                            <th width={50}>{this.props.t("Position in class")}</th>
                            <th>{this.props.t("Class")}</th>
                            <th>{this.props.t("Name")}</th>
                            <th>{this.props.t("Team")}</th>
                            {this.props.session.type==="QUALIFY"?
                            <th>{this.props.t("Lap")}</th>:null}
                            {this.props.session.type==="QUALIFY"?
                            <th>{this.props.t("Gap")}</th>:null}
                            {this.props.session.type==="RACE"?
                                <th>{this.props.t("Laps")}</th>:null}
                            {this.props.session.type==="RACE"?
                                <th>{this.props.t("Total time")}</th>:null}
                            {/*{this.props.session.type==="RACE"?*/}
                            {/*    <th>{this.props.t("Relative gap")}</th>:null}*/}
                            <th>{this.props.t("Penalties")}</th>
                            <th>{this.props.t("Points")}</th>
                            {this.props.user.role==="ADMIN"?
                            <th width={50}>{this.props.t("Actions")}</th>:null}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.session.results.map((result, index) =>{
                            let body =(
                            <tr key={index}>
                                <td>{result.position}.</td>
                                <td>
                                    {result.positionInClass > 0 ?
                                        <div>
                                            <span className="d-inline-block">{result.positionInClass}.</span>
                                        </div>
                                        : ""}
                                </td>
                                <td>{result.entry !== null && result.entry !== undefined ?
                                    <LicenseBadge name={result.entry.carClass.name}
                                                  color={result.entry.carClass.color}/> : null}
                                </td>
                                <td>
                                    {result.participants.map((driver, index) =>
                                        <div key={index}>
                                            {driver.user !== null && driver.user !== undefined ?
                                                <DriverLabel driver={driver.user}/>
                                                :
                                                <span>{driver.firstname + " " + driver.lastname}</span>
                                            }
                                        </div>
                                    )}
                                    {result.warnings.map((warning, index) =>
                                        <div key={index}>
                                            <Alert style={{padding: "2px", fontSize: "12px", marginBottom: "3px"}}
                                                   color={"danger"}><i
                                                className={"me-1 mdi mdi-alert"}/> {this.props.t(warning.warningText)}</Alert>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {result.entry !== null && result.entry !== undefined ?
                                        <span><strong>#{result.entry.number}</strong> {result.entry.team}</span> : null}
                                </td>
                                {this.props.session.type === "QUALIFY" ?
                                    <td className={"text-end"}><strong>{result.bestLap<2147483647?this.lapTimeFormat(result.bestLap):this.props.t("No time")}</strong></td>:null}
                                {this.props.session.type === "QUALIFY" ?
                                    <td className={"text-end"}><strong>{result.bestLap<2147483647 && index >0 ?"+ "+(((bestLap-result.bestLap)/1000)*-1).toFixed(3):null}</strong></td>:null}
                                {this.props.session.type === "RACE" ?
                                    <td className={"text-end"}><strong>{result.lapCount} {this.getLapsLabel(result.lapCount)}</strong></td>:null}
                                {this.props.session.type === "RACE" ?
                                    <td className={"text-end"}>
                                        {index==0?
                                        <strong>
                                            {result.totalTimeWithPenalties<2147483647?this.lapTimeFormat(result.totalTimeWithPenalties):this.props.t("DNF")}
                                        </strong>
                                            :
                                            result.totalTimeWithPenalties<2147483647?
                                            <React.Fragment>
                                                {result.lapCount===lapCount?
                                                    <React.Fragment>
                                                {result.totalTimeWithPenalties<2147483647 && index >0 ?
                                                    <strong>
                                                        {"+ "+(((totalTime-result.totalTimeWithPenalties)/1000)*-1).toFixed(3)}</strong>
                                                    :null}
                                                    </React.Fragment>:
                                                    <React.Fragment>
                                                        <strong>
                                                            + {lapCount-result.lapCount} {this.getLapsLabel(lapCount-result.lapCount)}</strong><br/>
                                                        ({"+ "+((((totalTime-result.totalTimeWithPenalties)/1000)*-1)+(lapCount-result.lapCount)*winnerLastLap/1000).toFixed(3)})
                                                    </React.Fragment>}
                                            </React.Fragment>:<strong>{this.props.t("DNF")}</strong>}
                                    </td>:null}
                                {/*{this.props.session.type === "RACE" ?*/}
                                {/*    <td className={"text-end"}>*/}

                                {/*        <strong>*/}
                                {/*            {result.totalTimeWithPenalties<2147483647 && index >0 ?*/}

                                {/*                "+ "+(((totalTimeRelative-result.totalTimeWithPenalties)/1000)*-1).toFixed(3)*/}
                                {/*                :null}*/}
                                {/*        </strong>*/}
                                {/*    </td>:null}*/}
                                <td>
                                    {result.penalties && result.penalties.map((penalty,index)=>
                                        <PenaltyBlock penalty={penalty} key={index}/>
                                    )}
                                    {this.props.user.role==="ADMIN"?
                                    <AddPenealty result={result} eventId={this.props.event.id} sessionId={this.props.session.id} />:null}
                                </td>
                                <td className={"text-center"}>
                                    {result.points}
                                </td>
                                {this.props.user.role==="ADMIN"?
                                <td>

                                </td>:null}

                            </tr>)
                                totalTimeRelative = result.totalTimeWithPenalties
                            return body;
                        }
                        )
                        }

                        </tbody>
                    </Table>

                </div>
                {this.props.user.role===ADMIN?
                <div className={"text-end mt-2"}>
                    <DeleteResultButton eventId={this.props.event.id} sessionId={this.props.session.id}/>
                </div>:null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user:state.Auth.user
    }
};
export default withRouter(
    connect(mapStateToProps, {})(withTranslation()(ResultTable))
);
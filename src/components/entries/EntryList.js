import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getSeriesDetail} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {approveEntry, editEntry, getEntries} from "../../store/entry/actions";
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";
import DriverLabel from "./DriverLabel";
import {ADMIN} from "../Role";
import {getEntriesEntryList, getEntriesExport} from "../../helpers/backend_calls";
import {getColorBrightness} from "../tools";
import FileSaver from 'file-saver';

const sstyle ='.entry-container{border:1px solid;height:400px} .class-container{border-bottom:1px solid #74788d;padding:8px;color:white;font-weight:700}.image-container{position:relative;padding:10px;height:200px;overflow:hidden}.image-container img{max-width:100%;max-height:100%}' +
    '.state-container{padding:8px;color:white;font-weight:700;position:absolute;bottom:20px;right:0;}.driver-container{padding:5px;font-size:14px;font-weight:600}.team-container{padding:5px}'

class EntryList extends Component {



    check(entry){
        let showReg=false;
            entry.drivers.forEach(driver=>{
                if(driver.id===this.props.user.id){
                    showReg=true
                }
            })

        return showReg;
    }

    downloadExport=()=>{
        getEntriesExport(this.props.series).then(response => {
            FileSaver.saveAs(new Blob([response], {type: "application/csv;charset=utf-8"}), "export-"+this.props.series.code+".csv");
        }).catch(err => console.error(err));
    }
    downloadEntryList=()=>{
        getEntriesEntryList(this.props.series).then(response => {
            FileSaver.saveAs(new Blob([JSON.stringify(response, null, "\t")], {type: "application/json;charset=utf-8"}), "export-"+this.props.series.code+".json");
        }).catch(err => console.error(err));
    }
    approve=(entry)=>{
        this.props.approveEntry({series:this.props.series,id:entry.id})
    }

    linkRef = React.createRef();

    render() {
        return (
            <React.Fragment>
                <style>{sstyle}</style>
            <Row>
                <Col md={12}>
                    <h3>{this.props.t("Entry list")}</h3>
                </Col>
                {this.props.user.role===ADMIN?
                <Col md={12}>
                    <div className={"text-end"}>
                        {/*<Button onClick={this.downloadExport} className={"btn btn-success me-1"}>Export</Button>*/}
                        {/*<Button onClick={this.downloadEntryList} className={"btn btn-info"}>Entry list</Button>*/}
                    </div>
                </Col>:null}
                {this.props.entries.map((entry,index)=> {
                    let stateColor = "#818181"
                    if(entry.state==="APPROVED"){
                        stateColor=entry.carClass.color
                    }
                    if(entry.state==="BANNED"){
                        stateColor="#000"
                    }
                    //console.log(getColorBrightness(entry.carClass.color))
                    return <Col className={"mt-3"} key={index} lg={4} xl={3}>

                        <div className={"entry-container"} >
                            <div className="class-container text-center" style={{background: entry.carClass.color}}>
                                <Row>
                                <Col xs={6} className={"text-start"} style={{color:getColorBrightness(entry.carClass.color)}}>{entry.carClass.name}</Col>
                                <Col xs={6} className={"text-end"} style={{color:getColorBrightness(entry.carClass.color)}}>#{entry.number}</Col>
                                </Row>
                            </div>
                            <div className={"image-container text-center"}>
                                <img src={API_URL + IMAGE_PROVIDER + entry.image} />
                                <div className={"state-container"} style={{background: stateColor}}>
                                    <span style={{color:getColorBrightness(stateColor)}}>{this.props.t(entry.state)}</span>
                                </div>
                            </div>
                            <div className={"text-center driver-container"}>
                                {entry.drivers.map((driver,index)=>{
                                    return <div  key={index}><DriverLabel driver={driver} key={index}/></div>
                                })}
                            </div>
                            <div className={"text-center team-container"}>
                                {entry.car.name} - {entry.team}
                            </div>
                            {this.check(entry) || this.props.user.role===ADMIN?
                            <div className={"text-center team-container"}>
                                <Link to={"/series/"+this.props.series.id+"/entry/"+entry.id} className={"btn btn-info me-1 btn-sm"}>{this.props.t("Edit")}</Link>
                                {entry.state==="WAITING" && this.props.user.role===ADMIN?
                                <Button onClick={()=>this.approve(entry)} className={"btn btn-success btn-sm"}>{this.props.t("Approve")}</Button>:null}
                            </div>:null}
                        </div>
                    </Col>
                })}

            </Row>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail,
        entries: state.Entry.entries,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {approveEntry})(withTranslation()(EntryList))
);
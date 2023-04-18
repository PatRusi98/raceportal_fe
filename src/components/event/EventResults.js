import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries,} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {ADMIN} from "../Role";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {getEventResults, uploadResult} from "../../store/event/actions";
import ResultTable from "./ResultTable";

class EventResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: "tab-0",
            selectedFile: undefined
        }
    }

    componentDidMount() {
        //console.log(this.props.event)
        this.props.getEventResults(this.props.event)
    }

    toggle = (tab) => {
        this.setState({
            activeTab: tab
        })
    }

    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });

    };

    save = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.props.uploadResult(this.props.event, formData)
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    {this.props.user.role === ADMIN ?
                        <Col md={12}>
                            <hr/>
                            <div className={"form-group"}>
                                <label htmlFor={"resultUpload"}>{this.props.t("Results")}</label>
                                <div className="input-group">
                                    <Input type="file" className="form-control" id={"resultUpload"}
                                           name={"resultUpload"} onChange={this.onFileChangeHandler}/>
                                    <Button color="success" type="button"
                                            onClick={this.save}>{this.props.t("Save")}</Button>
                                </div>
                            </div>
                            <hr/>
                        </Col> : null}
                    <Col md={12}>
                        <Nav tabs className="navtab-bg nav-justified">
                            {this.props.results.map((result,index) => {
                                return (
                                    <NavItem key={index}>
                                        <NavLink
                                            style={{cursor: "pointer"}}
                                            className={classnames({
                                                active: this.state.activeTab === "tab-"+index,
                                            })}
                                            onClick={() => this.toggle("tab-"+index)}
                                        >
                                            {(result.type==="RACE"?this.props.t("Race"):this.props.t("Qualification"))}
                                        </NavLink>
                                    </NavItem>)
                            })}
                        </Nav>
                    </Col>
                    <Col md={12}>
                        <TabContent activeTab={this.state.activeTab} className="text-muted mt-4 mt-md-0">
                            {this.props.results.map((result,index) => {
                                return (
                            <TabPane key={index} tabId={"tab-"+index}>
                                <ResultTable event={this.props.event} session={result}/>
                            </TabPane>)
                            })}

                        </TabContent>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.Auth.user,
        event: state.Event.eventDetail,
        results: state.Event.eventResults,
        series: state.Series.seriesDetail,


    }
};
export default withRouter(
    connect(mapStateToProps, {uploadResult, getEventResults})(withTranslation()(EventResults))
);
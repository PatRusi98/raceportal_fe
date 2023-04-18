import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import SeriesMainManage from "./SeriesMainManage";
import SeriesClassesManage from "./SeriesClassesManage";
import SeriesEventsManage from "./SeriesEventsManage";
import SeriesImageManage from "./SeriesImageManage";

class SeriesManage extends Component {

    constructor(props) {
        super(props);
        this.state={
            activeTab: "series"
        }
    }

    toggle = (tab) => {
        this.setState({
            activeTab: tab
        })
    }

    getTabContent=()=>{
        switch (this.state.activeTab){
            case "series":
                return <SeriesMainManage />;
            case "classes":
                return <SeriesClassesManage />;
            case "events":
                return <SeriesEventsManage />;
            case "image":
                return <SeriesImageManage />;
        }
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    <Col md="3">
                        <Nav pills className="flex-column">
                            <NavItem>
                                <NavLink
                                    style={{cursor: "pointer"}}
                                    className={classnames({
                                        'mb-2': true,
                                        active: this.state.activeTab === "series",
                                    })}
                                    onClick={() => this.toggle("series")}
                                >
                                    {this.props.t("Series")}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{cursor: "pointer"}}
                                    className={classnames({
                                        active: this.state.activeTab === "classes",
                                    })}
                                    onClick={() => this.toggle("classes")}
                                >
                                    {this.props.t("Classes")}
                                </NavLink>
                            </NavItem>

                            {/*<NavItem>*/}
                            {/*    <NavLink*/}
                            {/*        style={{cursor: "pointer"}}*/}
                            {/*        className={classnames({*/}
                            {/*            active: this.state.activeTab === "events",*/}
                            {/*        })}*/}
                            {/*        onClick={() => this.toggle("events")}*/}
                            {/*    >*/}
                            {/*        {this.props.t("Events")}*/}
                            {/*    </NavLink>*/}
                            {/*</NavItem>*/}
                            <NavItem>
                                <NavLink
                                    style={{cursor: "pointer"}}
                                    className={classnames({
                                        active: this.state.activeTab === "image",
                                    })}
                                    onClick={() => this.toggle("image")}
                                >
                                    {this.props.t("Image")}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="9">
                        <TabContent className="text-muted mt-4 mt-md-0">
                            <TabPane>
                                {this.getTabContent()}
                            </TabPane>


                        </TabContent>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        series:state.Series.seriesDetail
    }
};
export default withRouter(
    connect(mapStateToProps, {deleteSeries})(withTranslation()(SeriesManage))
);
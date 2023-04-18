import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAllSeries, getSeriesDetail, getStandings} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import SeriesManage from "../../components/series/SeriesManage";
import SeriesEvents from "../../components/series/SeriesEvents";
import {ADMIN} from "../../components/Role";
import EntryForm from "../../components/entries/EntryForm";
import EntryList from "../../components/entries/EntryList";
import EntryContainer from "../../components/entries/EntryContainer";
import Standings from "../../components/series/Standings";
import {getEntries} from "../../store/entry/actions";
import {getSeriesEvents} from "../../store/event/actions";

class SeriesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.match.params.module || "main"
        }
    }

    componentDidMount() {
        this.props.getSeriesDetail({id: this.props.match.params.id})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getSeriesDetail({id: this.props.match.params.id})
        }
    }

    toggle = (tab) => {
        this.props.history.push("/series/"+this.props.match.params.id+"/"+tab)
        switch (tab){
            case "main":
                this.props.getSeriesDetail({id:this.props.match.params.id})
                break
            case "entries":
                this.props.getEntries(this.props.series)
                break
            case "events":
                this.props.getSeriesEvents({id:this.props.series.id})
                break
            case "standings":
                this.props.getStandings(this.props.series)
                break
        }
        this.setState({
            activeTab: tab
        })
    }


    render() {
        if (this.props.series.id !== Number(this.props.match.params.id)) {

            return <div className="page-content">Loading</div>
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.series.name}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.series.name}/>
                        <Row>
                            <Col lg="12">
                                <Card outline style={{border:"1px solid "+this.props.series.color}}>
                                    <CardBody>
                                        <Nav tabs className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "main",
                                                    })}
                                                    onClick={() => this.toggle("main")}
                                                >
                                                    {this.props.t("Main")}
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "entries",
                                                    })}
                                                    onClick={() => this.toggle("entries")}
                                                >
                                                    {this.props.t("Entries")}
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "events",
                                                    })}
                                                    onClick={() => this.toggle("events")}
                                                >
                                                    {this.props.t("Events")}
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "standings",
                                                    })}
                                                    onClick={() => this.toggle("standings")}
                                                >
                                                    {this.props.t("Standings")}
                                                </NavLink>
                                            </NavItem>
                                            {this.props.user.role===ADMIN?
                                            <NavItem>
                                                <NavLink
                                                    style={{cursor: "pointer"}}
                                                    className={classnames({
                                                        active: this.state.activeTab === "manage",
                                                    })}
                                                    onClick={() => this.toggle("manage")}
                                                >
                                                    {this.props.t("Manage")}
                                                </NavLink>
                                            </NavItem>:null}
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab} className="p-3 text-muted">
                                            <TabPane tabId="main">
                                                <h4>{this.props.series.name}</h4>
                                                <Row>
                                                    <Col md={12} >
                                                <div dangerouslySetInnerHTML={{__html: this.props.series.description}}/>
                                                    </Col>
                                                {this.props.series.rules !== "" &&
                                                <Col md={12}>
                                                    <hr/>
                                                    <h5>{this.props.t("Rules")}</h5>
                                                    <div dangerouslySetInnerHTML={{__html: this.props.series.rules}}/>
                                                </Col>
                                                }
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="entries">
                                                <EntryContainer/>
                                            </TabPane>
                                            <TabPane tabId="events">
                                                <SeriesEvents/>
                                            </TabPane>
                                            <TabPane tabId="manage">
                                                <SeriesManage/>
                                            </TabPane>
                                            <TabPane tabId="standings">
                                                <Standings/>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getSeriesDetail,getEntries,getSeriesEvents,getStandings})(withTranslation()(SeriesDetail))
);
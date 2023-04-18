import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getAllSeries} from "../../store/series/actions";
import NewSeries from "../../components/series/NewSeries";
import SimulatorColumn from "../../components/series/SimulatorColumn";
import StateColumn from "../../components/series/StateColumn";
import DeleteSeriesButton from "../../components/series/DeleteSeriesButton";

class Series extends Component {

    componentDidMount() {
        this.props.getAllSeries();
    }

    render() {
        return (
            <React.Fragment>
                <MetaTags>
                    <title>Series settings</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Series")}/>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <div className="text-end">
                                                    <NewSeries/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={"mt-2"}>
                                            <Col>
                                                <div className="table-responsive">
                                                    <Table
                                                        className="table table-hover table-stripped table-bordered mb-0">
                                                        <thead>
                                                        <tr>
                                                            <th width={50}>{this.props.t("Simulator")}</th>
                                                            <th>{this.props.t("Name")}</th>
                                                            <th width={70}>{this.props.t("State")}</th>
                                                            <th width={80}>{this.props.t("Actions")}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.props.series.length === 0 &&
                                                        <tr>
                                                            <td colSpan={3}>{this.props.t("No series available")}</td>
                                                        </tr>
                                                        }
                                                        {this.props.series.map((series, index) =>
                                                            <tr key={index}>
                                                                <td><SimulatorColumn simulator={series.simulator}/></td>
                                                                <td><strong>{series.name}</strong></td>
                                                                <td><StateColumn state={series.state}/></td>
                                                                <td>
                                                                    <div className={"btn-group"}>
                                                                        <Link to={"/series/" + series.id + "/manage"}
                                                                              title={this.props.t("Edit")}
                                                                              className="btn btn-info btn-sm"><i
                                                                            className={"mdi mdi-pencil"}/></Link>
                                                                        <DeleteSeriesButton id={series.id}/>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
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
        series: state.Series.allSeries,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getAllSeries})(withTranslation()(Series))
);
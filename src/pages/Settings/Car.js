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
import {getAllCars} from "../../store/car/actions";
import NewCar from "../../components/car/NewCar";
import DeleteCarButton from "../../components/car/DeleteCarButton";
import {ADMIN} from "../../components/Role";

class Series extends Component {

    componentDidMount() {
        this.props.getAllCars();
    }

    render() {
        if(this.props.user.role!==ADMIN){
            this.props.history.push("/");
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>Cars settings</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Cars")}/>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <div className="text-end">
                                                    <NewCar/>
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
                                                            <th width={80}>{this.props.t("Actions")}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.props.cars.length === 0 &&
                                                        <tr>
                                                            <td colSpan={3}>{this.props.t("No series available")}</td>
                                                        </tr>
                                                        }
                                                        {this.props.cars.map((car, index) =>
                                                            <tr key={index}>
                                                                <td><SimulatorColumn simulator={car.simulator}/></td>
                                                                <td><strong>{car.name}</strong></td>
                                                                <td>
                                                                    <div className={"btn-group"}>

                                                                        {/*<Link to={"/series/" + car.id + "/manage"}*/}
                                                                        {/*      title={this.props.t("Edit")}*/}
                                                                        {/*      className="btn btn-info btn-sm"><i*/}
                                                                        {/*    className={"mdi mdi-pencil"}/></Link>*/}
                                                                        <DeleteCarButton id={car.id}/>
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
        cars: state.Car.allCars,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getAllCars})(withTranslation()(Series))
);
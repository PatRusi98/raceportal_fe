import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";

import {getAllLicenses} from "../../store/license/actions";
import LicenseBadge from "../../components/Licenses/LicenseBadge";
import DeleteLicenseButton from "../../components/Licenses/DeleteLicenseButton";
import {ADMIN} from "../../components/Role";

class Licenses extends Component {

    componentDidMount() {
        this.props.getAllLicenses();
    }

    render() {
        if(this.props.user.role!==ADMIN){
            this.props.history.push("/");
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>Licenses settings</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Licenses")}/>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <div className="text-end">
                                                    <Link className={"btn btn-info "} to="/settings/licenses/new"><i className={"mdi mdi-plus me-2"} /> {this.props.t("Add")}</Link>
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
                                                                <th width={250}>{this.props.t("Name")}</th>
                                                                <th>{this.props.t("Description")}</th>
                                                                <th width={80}>{this.props.t("Actions")}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.props.licenses.length === 0 &&
                                                        <tr>
                                                            <td colSpan={3}>{this.props.t("No licenses available")}</td>
                                                        </tr>
                                                        }
                                                        {this.props.licenses.map((license, index) =>
                                                            <tr key={index}>
                                                                <td>
                                                                    <Link to={"/settings/licenses/"+license.id} >
                                                                        <LicenseBadge name={license.name} color={license.color}/>
                                                                    </Link></td>
                                                                <td>{license.description}</td>
                                                                <td>
                                                                    <div className={"btn-group"}>
                                                                        <DeleteLicenseButton id={license.id}/>
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
        licenses:state.License.allLicenses,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getAllLicenses})(withTranslation()(Licenses))
);
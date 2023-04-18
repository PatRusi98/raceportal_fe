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
import {getAllUsers} from "../../store/user/actions";
import {ADMIN} from "../../components/Role";

class Users extends Component {

    componentDidMount() {
        this.props.getAllUsers();
    }

    render() {
        if(this.props.user.role!==ADMIN){
            this.props.history.push("/");
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.t("Users")}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Users")}/>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row className={"mt-2"}>
                                            <Col>
                                                <div className="table-responsive">
                                                    <Table
                                                        className="table table-hover table-stripped table-bordered mb-0">
                                                        <thead>
                                                        <tr>
                                                            <th width={250}>{this.props.t("Name")}</th>
                                                            <th>{this.props.t("Licenses")}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.props.users.length === 0 &&
                                                        <tr>
                                                            <td colSpan={3}>{this.props.t("No users available")}</td>
                                                        </tr>
                                                        }
                                                        {this.props.users.map((user, index) =>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <Link
                                                                            to={"/settings/users/" + user.id}>{user.name}</Link>
                                                                    </td>
                                                                    <td>
                                                                        {user.licenses && user.licenses.map((license, index) =>
                                                                                <span key={index} className={"me-3"}>
                                                <LicenseBadge name={license.name} color={license.color}/>
                                            </span>
                                                                        )}
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
        users: state.User.allUsers,
        user: state.Auth.user

    }
};

export default withRouter(
    connect(mapStateToProps, {getAllUsers})(withTranslation()(Users))
);
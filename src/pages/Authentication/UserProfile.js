import PropTypes from "prop-types";
import React, {Component} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Container, Row} from "reactstrap";

// Redux
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import iracing from "../../assets/images/sims/iracing.png";
import rf2 from "../../assets/images/sims/rF2.png";
import MetaTags from "react-meta-tags";
import {withTranslation} from "react-i18next";
import AccProfileCard from "../../components/profile/ACCProfileCard";
import RREProfileCard from "../../components/profile/RREProfileCard";
import ProfilePicture from "../../components/profile/ProfilePicture";
import BasicProfileInfo from "../../components/profile/BasicProfileInfo";


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.user.name}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Profile")}/>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <ProfilePicture/>
                                            <BasicProfileInfo/>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6}>
                                <AccProfileCard/>
                            </Col>
                            <Col xl={6} lg={6}>
                                <RREProfileCard/>
                            </Col>
                            <Col xl={6} lg={6}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        <img
                                            src={rf2}
                                            alt="rfactor2"
                                            className="img-responsive"
                                            style={{height:"50px"}}
                                        />
                                    </CardTitle>
                                    <CardBody>
                                        <p>{this.props.t("...preparing")}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        <img
                                            src={iracing}
                                            alt="iRacing"
                                            className="img-responsive"
                                            style={{height:"35px"}}
                                        />
                                    </CardTitle>
                                    <CardBody>
                                    <p>{this.props.t("...preparing")}</p>
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
    return {user: state.Auth.user}
};

export default withRouter(
    connect(mapStateToProps, {})(withTranslation()(UserProfile))
);

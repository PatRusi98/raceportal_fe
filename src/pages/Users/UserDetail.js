import PropTypes from "prop-types";
import React, {Component} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Container, FormGroup,
    Input,
    InputGroup,
    Row
} from "reactstrap";

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
import {addLicenseToUser, getUserDetail, removeLicenseFromUser} from "../../store/user/actions";
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";
import acc from "../../assets/images/sims/acc.png";
import {AvField, AvForm} from "availity-reactstrap-validation";
import rre from "../../assets/images/sims/rre.png";
import LicenseBadge from "../../components/Licenses/LicenseBadge";
import {getAllLicenses} from "../../store/license/actions";
import CountryLabel from "../../components/profile/CountryLabel";
import {ADMIN} from "../../components/Role";


class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getUserDetail({id: this.props.match.params.id})
        this.props.getAllLicenses()
    }

    addLicense = (event, values) => {

        let license = values.license
        if(license>0) {
            this.props.addLicenseToUser({id: this.props.match.params.id, license: license})
        }
    }

    removeLicense = (license) => {
        this.props.removeLicenseFromUser({id:this.props.match.params.id,license:license})
    }
    render() {
        if (this.props.user.id === undefined) {
            return (<div>LOADING</div>)
        }
        if(this.props.auth.role!==ADMIN){
            this.props.history.push("/");
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.user.name}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("User detail")}/>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md={3}>
                                                <img
                                                    src={API_URL + IMAGE_PROVIDER + this.props.user.avatar}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                            </Col>
                                            <Col md={9}>
                                                <h5>{this.props.user.name}</h5>
                                                <hr/>
                                                <Row className={"mb-2"}>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Name")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.name}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Steam ID")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.steam_id}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-2"}>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("License SAMŠ")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.licenseSams}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Date of birth")}:</Col>
                                                            <Col xs={8}><strong>{new Date(this.props.user.birth).toLocaleDateString()}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-2"}>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("IBAN")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.iban}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Phone")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.phone}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-2"}>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Address")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.address}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Country")}:</Col>
                                                            <Col xs={8}><strong><CountryLabel country={this.props.user.country}/></strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-2"}>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Shirt size")} <a href={"/images/shirt.jpeg"} target={"_blank"}><i className={"mdi mdi-information-outline"}></i></a>:</Col>
                                                            <Col xs={8}><strong>{this.props.user.shirt}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Email")}:</Col>
                                                            <Col xs={8}><strong>{this.props.user.username}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        {this.props.t("Admin")}
                                    </CardTitle>
                                    <CardBody>
                                        {this.props.user.licenses && this.props.user.licenses.map((license, index) =>
                                            <span className={"me-3"}>
                                                <LicenseBadge name={license.name} color={license.color}/>
                                                <Button title={this.props.t("Remove License")} outline
                                                        onClick={()=>this.removeLicense(license.id)}
                                                        className={"btn-sm"} style={{
                                                    height: "21px",
                                                    marginTop: "-2px",
                                                    marginLeft: "-2px",
                                                    paddingTop: "1px",
                                                    borderLeft: "0"
                                                }}>x</Button>
                                            </span>
                                        )}
                                        <hr/>
                                        <div className={"text-end mt-2"}>
                                            <AvForm className="form-horizontal"
                                                    onValidSubmit={this.addLicense}>
                                                <InputGroup>
                                                    <AvField name="license"
                                                             className="form-control-sm"
                                                             type="select"
                                                             size={"sm"}
                                                    >
                                                        <option value={0}>{this.props.t("Please choose...")}</option>
                                                        {this.props.licenses && this.props.licenses.map((license, index) =>
                                                            <option value={license.id}>{license.name}</option>
                                                        )}
                                                    </AvField>
                                                    <Button color={"info"} style={{height:"27px"}}
                                                            className={"btn-sm"}>{this.props.t("Add License")}  </Button>
                                                </InputGroup>
                                            </AvForm>
                                        </div>
                                    </CardBody>

                                </Card>
                            </Col>
                            <Col xl={6} lg={6}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        <img
                                            src={acc}
                                            alt="Assetto Corsa Competizione"
                                            className="img-responsive"
                                            style={{height: "50px"}}
                                        />
                                    </CardTitle>
                                    <CardBody>
                                        <React.Fragment>
                                            <Row className={"mb-2"}>
                                                <Col xs={5}>{this.props.t("Short name")}:</Col>
                                                <Col xs={7}><strong>{this.props.user.accShortName}</strong></Col>
                                            </Row>
                                            <Row className={"mb-2"}>
                                                <Col xs={5}>{this.props.t("First name")}:</Col>
                                                <Col xs={7}><strong>{this.props.user.accFirstName}</strong></Col>
                                            </Row>
                                            <Row className={"mb-2"}>
                                                <Col xs={5}>{this.props.t("Last name")}:</Col>
                                                <Col xs={7}><strong>{this.props.user.accLastName}</strong></Col>
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        <img
                                            src={rre}
                                            alt="RaceRoom Racing Experience"
                                            className="img-responsive"
                                            style={{height: "38px"}}
                                        />
                                    </CardTitle>
                                    <CardBody>
                                        <Row className={"mb-2"}>
                                            <Col xs={5}>{this.props.t("UserID")}:</Col>
                                            <Col xs={7}><strong>{this.props.user.rreId}</strong></Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6}>
                                <Card>
                                    <CardTitle className="h4 m-2">
                                        <img
                                            src={rf2}
                                            alt="rfactor2"
                                            className="img-responsive"
                                            style={{height: "50px"}}
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
                                            style={{height: "35px"}}
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
    return {
        user: state.User.userDetail,
        licenses: state.License.allLicenses,
        auth: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getUserDetail, getAllLicenses,addLicenseToUser,removeLicenseFromUser})(withTranslation()(UserDetail))
);

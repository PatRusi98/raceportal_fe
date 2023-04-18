import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import rre from "../../assets/images/sims/rre.png";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {editUser} from "../../store/auth/actions";
import LicenseBadge from "../Licenses/LicenseBadge";
import CountryLabel from "./CountryLabel";

class BasicProfileinfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleValidSubmit = (event, values) => {
        let user = {...this.props.user, ...values}

        this.props.editUser({user})
        this.toggleEdit();
    }

    render() {
        return (
            <Col md={9}>
                <h5>{this.props.user.name}</h5>
                <hr/>
                {this.state.edit ?
                    <React.Fragment>
                        <AvForm className="form-horizontal"
                                onValidSubmit={this.handleValidSubmit}>
                            <Row className={"mb-2"}>
                                <Col md={6}>
                                    <AvField name="name"
                                             value={this.props.user.name}
                                             label={this.props.t("Name")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter name")}
                                             type="text"
                                             validate={{
                                                 required: {
                                                     value: true,
                                                     errorMessage: 'Please enter a name'
                                                 },
                                                 minLength: {
                                                     value: 6,
                                                     errorMessage: 'Your name must be between 6 and 255 characters'
                                                 },
                                                 maxLength: {
                                                     value: 255,
                                                     errorMessage: 'Your name must be between 6 and 255 characters'
                                                 }
                                             }}
                                             required
                                    />
                                </Col>
                                <Col md={6}>
                                    <AvField name="steam_id"
                                             value={this.props.user.steam_id}
                                             label={this.props.t("Steam ID")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter Steam ID")}
                                             type="text"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <AvField name="licenseSams"
                                         value={this.props.user.licenseSams}
                                         label={this.props.t("License SAMŠ")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter license SAMŠ")}
                                         type="text"
                                />
                                </Col>
                                <Col md={6}>
                                    <AvField name="birth"
                                             value={new Date(this.props.user.birth).toISOString().slice(0, 10)}
                                             label={this.props.t("Date of birth")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter date of birth")}
                                             type="date"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <AvField name="iban"
                                             value={this.props.user.iban}
                                             label={this.props.t("IBAN")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter IBAN")}
                                             type="text"
                                    />
                                </Col>
                                <Col md={6}>
                                    <AvField name="phone"
                                             value={this.props.user.phone}
                                             label={this.props.t("Phone")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter phone")}
                                             type="text"
                                    />
                                </Col>
                            </Row>
                            <Row>

                                <Col md={6}>
                                    <AvField name="address"
                                             value={this.props.user.address}
                                             label={this.props.t("Address")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter address")}
                                             type="text"
                                    />
                                </Col>
                                <Col md={6}>
                                    <AvField name="country"
                                             value={this.props.user.country}
                                             label={this.props.t("Country")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter country")}
                                             type="select"
                                    >
                                        <option value={"SK"}>{this.props.t("Slovak Republic")}</option>
                                        <option value={"CZ"}>{this.props.t("Czech Republic")}</option>
                                    </AvField>
                                </Col>
                            </Row>
                            <Row>

                                <Col md={6}>
                                    <AvField name="shirt"
                                             value={this.props.user.shirt}
                                             label={this.props.t("Shirt size")}
                                             className="form-control"
                                             placeholder={this.props.t("Enter shirt size")}
                                             type="text"
                                    />
                                </Col>

                            </Row>
                            <div className="button-items text-end">
                                <Button className={"btn btn-sm btn-success"} type={"submit"}><i
                                    className="mdi mdi-content-save font-size-16 align-middle me-2"/>{this.props.t("Save")}
                                </Button>
                                <Button className={"btn btn-sm btn-secondary"} onClick={this.toggleEdit}><i
                                    className="mdi mdi-cancel font-size-16 align-middle me-2"/>{this.props.t("Cancel")}
                                </Button>
                            </div>
                        </AvForm>

                    </React.Fragment>
                    :
                    <React.Fragment>
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
                                    <Col xs={4}>{this.props.t("Shirt size")} <a href={"/images/shirt.jpeg"} target={"_blank"}><i className={"mdi mdi-information-outline"}/></a>:</Col>
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
                        <hr/>
                        <Row className={"mb-2"}>
                            <Col md={12}>
                        {this.props.user.licenses && this.props.user.licenses.map((license, index) =>
                            <span key={index} className={"me-3"}>
                                                <LicenseBadge name={license.name} color={license.color}/>

                                            </span>
                        )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"text-end"}>
                                <Button className={"btn-sm btn-info"} onClick={this.toggleEdit}><i
                                    className="mdi mdi-pencil align-middle me-2"/>{this.props.t("Edit")}
                                </Button>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.Auth.user}
};

export default withRouter(
    connect(mapStateToProps, {editUser})(withTranslation()(BasicProfileinfo))
);
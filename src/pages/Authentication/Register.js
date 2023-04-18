import React, {Component} from "react"
import MetaTags from 'react-meta-tags';
import {Alert, Col, Container, Label, Row} from "reactstrap"

// Redux
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"


import {AvField,AvInput, AvForm} from "availity-reactstrap-validation"
import packageJson from '../../../package.json';

import logo from "../../assets/images/logo.webp";
import {withTranslation} from "react-i18next"
import {registerUser} from "../../store/auth/actions";


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    handleValidSubmit = (event, values) => {
        this.props.registerUser(values, this.props.history)
    }

    render() {
        return (

            <React.Fragment>
                <div>
                    <MetaTags>
                        <title>{this.props.t("Register")}</title>
                    </MetaTags>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col xl={9}>
                                <div className="auth-full-bg pt-lg-5 p-4">
                                    <div className="w-100">
                                        <div className="bg-overlay"></div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={3}>
                                <div className="auth-full-page-content p-md-5 p-4">
                                    <div className="w-100">
                                        <div className="d-flex flex-column h-100">
                                            <div className="mb-4 mb-md-5">
                                                <Link to="dashboard" className="d-block auth-logo">
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        className="auth-logo-dark"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="my-auto">
                                                <div>
                                                    <h5 className="text-primary">{this.props.t("Register")}</h5>
                                                </div>
                                                <div className="mt-4">
                                                    <AvForm className="form-horizontal"
                                                            onValidSubmit={this.handleValidSubmit}>
                                                        {this.props.error && this.props.error ? (
                                                            <Alert color="danger">{this.props.error.message}</Alert>
                                                        ) : null}

                                                        <div className="mb-3">
                                                            <AvField name="name"
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
                                                                     required/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <AvField name="username" label={this.props.t("Email")}
                                                                     className="form-control"
                                                                     placeholder={this.props.t("Enter email")}
                                                                     type="email"
                                                                     validate={{
                                                                         required: {
                                                                             value: true,
                                                                             errorMessage: 'Please enter your email'
                                                                         },
                                                                         maxLength: {
                                                                             value: 255,
                                                                             errorMessage: 'Your username must be max 255 characters long'
                                                                         }
                                                                     }}
                                                                     required/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <AvField name="password"
                                                                     label={this.props.t("Password")}
                                                                     className="form-control"
                                                                     placeholder={this.props.t("Enter password")}
                                                                     type="password"
                                                                     validate={{
                                                                         pattern:{
                                                                             value:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$',
                                                                             errorMessage: 'Password must have at least one uppercase, one lowercase letter and one number'
                                                                         },
                                                                         minLength: {
                                                                             value: 8,
                                                                             errorMessage: 'Your name must be between 8 and 255 characters'
                                                                         },
                                                                         maxLength: {
                                                                             value: 255,
                                                                             errorMessage: 'Your name must be between 8 and 255 characters'
                                                                         },
                                                                         required: {
                                                                             value: true,
                                                                             errorMessage: 'Please enter your password'
                                                                         }
                                                                     }}
                                                                     required/>

                                                        </div>
                                                        <div className="mb-3">
                                                            <AvField name="password-confirm"
                                                                     label={this.props.t("Password confirmation")}
                                                                     className="form-control"
                                                                     placeholder={this.props.t("Enter password confirmation")}
                                                                     type="password"
                                                                     validate={{
                                                                         required: {
                                                                             value: true,
                                                                             errorMessage: 'Please enter password confirmation'
                                                                         },
                                                                         match: {
                                                                             value: 'password',
                                                                             errorMessage: 'Passwords doesn\'t match'
                                                                         }
                                                                     }}
                                                                     required/>
                                                        </div>
                                                        <div className="mb-3">

                                                            <AvInput name="acceptgdpr"
                                                                     className="me-2"
                                                                     type="checkbox"
                                                                     validate={{
                                                                         required: {
                                                                             value: true,
                                                                             errorMessage: 'Please accept GDPR'
                                                                         }
                                                                     }}

                                                                     required/>
                                                            <Label for={"acceptgdpr"}>{this.props.t("Accept")} <a href={"https://www.digitalmotorsport.sk/ochrana-sukromia/"} target={"blank"}>{this.props.t("GDPR")}</a> </Label>
                                                        </div>
                                                        <div className="mt-3 d-grid">
                                                            <button className="btn btn-primary btn-block"
                                                                    >{this.props.t("Sign up")}</button>
                                                        </div>

                                                    </AvForm>
                                                </div>
                                            </div>
                                            <div className="mt-5 text-center">
                                                <p>
                                                    {this.props.t("Already have an account?")} <Link to="login"
                                                                                                     className="fw-medium text-primary">{this.props.t("Login")}</Link>
                                                </p>
                                            </div>

                                            <div className="mt-4 mt-md-5 text-center">
                                                <p className="mb-0">
                                                    v{packageJson.version} | © {new Date().getFullYear()} Powered by SRCS
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default withRouter(
    connect(mapStateToProps, {registerUser})(withTranslation()(Register))
)
import React, {Component} from "react"
import MetaTags from 'react-meta-tags';
import {Alert, Col, Container, Row} from "reactstrap"

// Redux
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import packageJson from '../../../package.json';

import {AvField, AvForm} from "availity-reactstrap-validation"


import logo from "../../assets/images/logo.webp";
import {withTranslation} from "react-i18next"
import {loginUser} from "../../store/auth/actions";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    handleValidSubmit = (event, values) => {
        this.props.loginUser(values, this.props.history)
    }

    render() {
        return (

            <React.Fragment>
                <div>
                    <MetaTags>
                        <title>{this.props.t("Login")}</title>
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
                                                    <h5 className="text-primary">{this.props.t("Wellcome back!")}</h5>
                                                    <p className="text-muted">{this.props.t("Sign in to continue.")}</p>
                                                </div>

                                                <div className="mt-4">

                                                    <AvForm className="form-horizontal"
                                                            onValidSubmit={this.handleValidSubmit}>
                                                        {this.props.error && this.props.error.message ? (
                                                            <Alert color="danger">{this.props.t(this.props.error.message)}</Alert>
                                                        ) : null}

                                                        <div className="mb-3">
                                                            <AvField name="username"
                                                                     label={this.props.t("Email")}
                                                                     value=""
                                                                     className="form-control"
                                                                     placeholder={this.props.t("Enter email")}
                                                                     type="email"
                                                                     required
                                                            />
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/pages-forgot-pwd-2"
                                                                      className="text-muted">{this.props.t("Forgot password?")}</Link>
                                                            </div>
                                                            <AvField name="password"
                                                                     label={this.props.t("Password")}
                                                                     value=""
                                                                     className="form-control"
                                                                     placeholder={this.props.t("Enter Password")}
                                                                     type="password"
                                                                     required
                                                            />
                                                        </div>
                                                        <div className="mt-3 d-grid">
                                                            <button className="btn btn-primary btn-block"
                                                                    type="submit">{this.props.t("Log in")}</button>
                                                        </div>

                                                    </AvForm>
                                                </div>
                                            </div>
                                            <div className="mt-5 text-center">
                                                <p>
                                                    {this.props.t("Don't have an account?")} <Link to="register"
                                                                                                   className="fw-medium text-primary">{this.props.t("Signup Now")}</Link>
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
    return {
        error:state.Auth.error
    }
}

export default withRouter(
    connect(mapStateToProps, {loginUser})(withTranslation()(Login))
)
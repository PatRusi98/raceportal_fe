import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import acc from "../../assets/images/sims/acc.png";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {editUser} from "../../store/auth/actions";

class AccProfileCard extends Component {

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
        let user = {...this.props.user,...values}
        this.props.editUser({user})
        this.toggleEdit();
    }

    render() {
        return (
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
                    {this.state.edit ?
                        <React.Fragment>
                            <AvForm className="form-horizontal"
                                    onValidSubmit={this.handleValidSubmit}>
                                <AvField name="accShortName"
                                         value={this.props.user.accShortName}
                                         label={this.props.t("Short name")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter short name")}
                                         type="text"
                                         />
                                <AvField name="accFirstName"
                                         value={this.props.user.accFirstName}
                                         label={this.props.t("First name")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter first name")}
                                         type="text"
                                />
                                <AvField name="accLastName"
                                         value={this.props.user.accLastName}
                                         label={this.props.t("Last name")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter last name")}
                                         type="text"
                                />
                                <div className="button-items">
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

                            <Row>
                                <Col className={"text-end"}>
                                    <Button className={"btn-sm btn-info"} onClick={this.toggleEdit}><i
                                        className="mdi mdi-pencil align-middle me-2"/>{this.props.t("Edit")}
                                    </Button>
                                </Col>
                            </Row>
                        </React.Fragment>
                    }
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.Auth.user}
};

export default withRouter(
    connect(mapStateToProps, {editUser})(withTranslation()(AccProfileCard))
);
import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import rre from "../../assets/images/sims/rre.png";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {editUser} from "../../store/auth/actions";

class RreProfileCard extends Component {

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
                        src={rre}
                        alt="RaceRoom Racing Experience"
                        className="img-responsive"
                        style={{height:"38px"}}
                    />
                </CardTitle>
                <CardBody>
                    {this.state.edit ?
                        <React.Fragment>
                            <AvForm className="form-horizontal"
                                    onValidSubmit={this.handleValidSubmit}>
                                <AvField name="rreId"
                                         value={this.props.user.rreId}
                                         label={this.props.t("UserID")}
                                         className="form-control"
                                         placeholder={this.props.t("Enter UserID")}
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
                                <Col xs={5}>{this.props.t("UserID")}:</Col>
                                <Col xs={7}><strong>{this.props.user.rreId}</strong></Col>
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
    connect(mapStateToProps, {editUser})(withTranslation()(RreProfileCard))
);
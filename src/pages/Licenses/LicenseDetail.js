import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, ButtonGroup, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {createLicense, getLicenseDetail, updateLicense} from "../../store/license/actions";
import {ADMIN} from "../../components/Role";

class LicenseDetail extends Component {

    componentDidMount() {
        this.props.getLicenseDetail({id:this.props.match.params.id})
    }

    handleValidSubmit = (event, values) => {
        let data = {...values,id:this.props.match.params.id}
        this.props.updateLicense({data,history:this.props.history})

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
                                        <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                                            <Row>
                                                <Col md={12}>
                                                    <h2>{this.props.license.name}</h2>
                                                </Col>
                                                <Col md={4}>
                                                    <AvField name="name"
                                                             label={this.props.t("Name")}
                                                             className="form-control"
                                                             placeholder={this.props.t("Enter name")}
                                                             type="text"
                                                             value={this.props.license.name}
                                                             validate={{
                                                                 required: {
                                                                     value: true,
                                                                     errorMessage: 'Please enter a name'
                                                                 },
                                                                 minLength: {
                                                                     value: 3,
                                                                     errorMessage: 'Name must be between 3 and 255 characters'
                                                                 },
                                                                 maxLength: {
                                                                     value: 255,
                                                                     errorMessage: 'Name must be between 3 and 255 characters'
                                                                 }
                                                             }}
                                                             required
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <AvField name="description"
                                                             label={this.props.t("Description")}
                                                             className="form-control"
                                                             placeholder={this.props.t("Enter description")}
                                                             type="text"
                                                             value={this.props.license.description}
                                                             validate={{
                                                                 maxLength: {
                                                                     value: 255,
                                                                     errorMessage: 'Max length is 255 characters'
                                                                 }
                                                             }}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <AvField name="color"
                                                             label={this.props.t("Color")}
                                                             className="form-control"
                                                             style={{minHeight: "36px"}}
                                                             placeholder={this.props.t("Enter color")}
                                                             type="color"
                                                             value={this.props.license.color}
                                                             required
                                                    />
                                                </Col>
                                            </Row>
                                            <div className={"text-end"}>
                                                <ButtonGroup >
                                                    <Button className={""} type={"submit"} color={"success"}><i
                                                        className={"mdi mdi-content-save me-1"}/>{this.props.t("Save")}</Button>
                                                    <Link to={"/settings/licenses"} className={"btn btn-secondary"}><i
                                                        className={"mdi mdi-cross2 me-1"}/>{this.props.t("Cancel")}</Link>

                                                </ButtonGroup>
                                            </div>
                                        </AvForm>
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
        license:state.License.licenseDetail,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getLicenseDetail,updateLicense})(withTranslation()(LicenseDetail))
);
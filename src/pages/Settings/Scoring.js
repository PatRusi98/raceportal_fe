import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getAllScoring, getScoringDetail, setScoringDetail} from "../../store/scoring/actions";
import DeleteScoringButton from "../../components/scoring/DeleteScoringButton";
import ScoringEdit from "../../components/scoring/ScoringEdit";
import {ADMIN} from "../../components/Role";

class Scoring extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getAllScoring();
    }

    render() {
        if(this.props.user.role!==ADMIN){
            this.props.history.push("/");
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>Scoring settings</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.t("Scoring")}/>

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <div className="text-end">
                                                    <Button color={"success"} onClick={()=>this.props.setScoringDetail({id:0})} >{this.props.t("New scoring")}</Button>
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
                                                            <th>{this.props.t("Name")}</th>
                                                            <th width={80}>{this.props.t("Actions")}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.props.scoring.length === 0 &&
                                                        <tr>
                                                            <td colSpan={3}>{this.props.t("No scoring available")}</td>
                                                        </tr>
                                                        }
                                                        {this.props.scoring.map((scoring, index) =>
                                                            <tr key={index}>
                                                                <td><strong>{scoring.name}</strong></td>
                                                                <td>
                                                                    <div className={"btn-group"}>
                                                                        <Button
                                                                            onClick={()=>this.props.getScoringDetail({id:scoring.id})}
                                                                              title={this.props.t("Edit")}
                                                                              className="btn btn-info btn-sm"><i
                                                                            className={"mdi mdi-pencil"}/></Button>
                                                                        <DeleteScoringButton id={scoring.id}/>
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
                                <ScoringEdit />
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
        scoring: state.Scoring.allScoring,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getAllScoring,getScoringDetail,setScoringDetail})(withTranslation()(Scoring))
);
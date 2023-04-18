import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getSeriesDetail} from "../../store/series/actions";
import {getEntries, getEntry} from "../../store/entry/actions";

import {getAllUsers} from "../../store/user/actions";
import EntryEdit from "../../components/entries/EntryEdit";
import EntryChangeLivery from "../../components/entries/EntryChangeLivery";
import DeleteEntryButton from "../../components/entries/DeleteEntryButton";

class EntryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClass: undefined,
            selectedCar: undefined,
            selectedFile: null,
            selectedDrivers: []
        }
    }

    componentDidMount() {

        if (this.props.series.classes === undefined) {
            this.props.getSeriesDetail({id: this.props.match.params.id})
        }
        this.props.getAllUsers();
        this.props.getEntry({seriesId: this.props.match.params.id, id: Number(this.props.match.params.entryId)})

    }


    render() {

        if (this.props.series.classes === undefined || this.props.entry.id === undefined || this.props.users.length === 0 || this.props.entry.id !== Number(this.props.match.params.entryId)) {

            return <Container fluid>
                <div>loading</div>
            </Container>
        }
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.series.name}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.series.name}/>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md={8}>
                                                <EntryEdit/>
                                                <DeleteEntryButton/>
                                            </Col>
                                            <Col md={4}>
                                            <EntryChangeLivery/>

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
        series: state.Series.seriesDetail,
        users: state.User.allUsers,
        entry: state.Entry.entry
    }
};

export default withRouter(
    connect(mapStateToProps, {getEntry, getSeriesDetail, getAllUsers})(withTranslation()(EntryDetail))
);
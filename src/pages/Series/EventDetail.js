import React, {Component} from 'react';
import MetaTags from "react-meta-tags";
import {Button, Card, CardBody, Col, Container, Row, Table} from "reactstrap";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getSeriesDetail} from "../../store/series/actions";
import {getEventDetail, updateEvent} from "../../store/event/actions";
import EventImage from "../../components/event/EventImage";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";
import EventResults from "../../components/event/EventResults";
import {ADMIN} from "../../components/Role";
import Moment from "react-moment";
import moment from "moment";
import {getEntries} from "../../store/entry/actions";
import EventStateBadge from "../../components/event/EventStateBadge";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            description:"",
            briefing:""
        }
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit,
            description:this.props.event.description,
            briefing:this.props.event.briefing
        })
    }
    handleChangeDesc = (event, editor) => {
        this.setState({
            description: editor.getData()
        })
    }
    handleChangeBrief = (event, editor) => {
        this.setState({
            briefing: editor.getData()
        })
    }

    handleValidSubmit = (e, values) => {
        // let raceStart=new Date(values.raceStart).toISOString()
        // let qualifyStart=new Date(values.qualifyStart).toISOString()
        // let practiceStart=new Date(values.practiceStart).toISOString()
        //console.log(values.raceStart)
        let event = {...this.props.event, ...values,description: this.state.description,briefing: this.state.briefing}

        //console.log(event)
        this.props.updateEvent(event)
        this.toggleEdit();
    }

    componentDidMount() {
        this.props.getSeriesDetail({id:this.props.match.params.id})
        this.props.getEntries({id:this.props.match.params.id})
        this.props.getEventDetail({id:this.props.match.params.eventId,seriesId:this.props.match.params.id})
    }

    checkBriefing=()=>{
        if(this.props.user.role===ADMIN){
            //return true;
        }
        let showReg=false;
        this.props.entries.forEach((entry)=>{
            if(entry.state==="APPROVED") {
                entry.drivers.forEach(driver => {
                    if (driver.id === this.props.user.id) {
                        showReg = true
                    }
                })
            }
        })
        return showReg;
    }

    render() {
        let dateRaceStart = new Date(this.props.event.raceStart);
        let dateQualifyStart = new Date(this.props.event.qualifyStart);
        let datePracticeStart = new Date(this.props.event.practiceStart);
        return (
            <React.Fragment>
                <MetaTags>
                    <title>{this.props.series.name}</title>
                </MetaTags>
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Race Portal" breadcrumbItem={this.props.event.name}/>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            {this.state.edit?
                                                <Col md={8} >
                                                    <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>
                                                        <Row className={"mb-2"}>
                                                            <Col md={8}>
                                                                <AvField name="name"
                                                                         label={this.props.t("Name")}
                                                                         className="form-control"
                                                                         placeholder={this.props.t("Enter name")}
                                                                         type="text"
                                                                         value={this.props.event.name}
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
                                                            <Col md={4}>
                                                                <AvField name="code"
                                                                         label={this.props.t("Code")}
                                                                         className="form-control"
                                                                         placeholder={this.props.t("Enter code")}
                                                                         type="text"
                                                                         value={this.props.event.code}
                                                                         validate={{
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a code'
                                                                             },
                                                                             minLength: {
                                                                                 value: 3,
                                                                                 errorMessage: 'Code must be between 3 and 255 characters'
                                                                             },
                                                                             maxLength: {
                                                                                 value: 255,
                                                                                 errorMessage: 'Code must be between 3 and 255 characters'
                                                                             }
                                                                         }}
                                                                         required
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <AvField name="practiceStart"
                                                                         label={this.props.t("Practice start")}
                                                                         className="form-control"
                                                                         value={moment(this.props.event.practiceStart).utc(false).format("yyyy-MM-DDTHH:mm:ss")}
                                                                         type="datetime-local"
                                                                         validate={{
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a date'
                                                                             }
                                                                         }}
                                                                         required
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <AvField name="qualifyStart"
                                                                         label={this.props.t("Qualification start")}
                                                                         className="form-control"
                                                                         value={moment(this.props.event.qualifyStart).utc(false).format("yyyy-MM-DDTHH:mm:ss")}
                                                                         type="datetime-local"
                                                                         validate={{
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a date'
                                                                             }
                                                                         }}
                                                                         required
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <AvField name="raceStart"
                                                                         label={this.props.t("Race start")}
                                                                         className="form-control"
                                                                         type="datetime-local"
                                                                         value={moment(this.props.event.raceStart).utc(false).format("yyyy-MM-DDTHH:mm:ss")}
                                                                         validate={{
                                                                             required: {
                                                                                 value: true,
                                                                                 errorMessage: 'Please enter a date'
                                                                             }
                                                                         }}
                                                                         required
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <AvField name="state"
                                                                         label={this.props.t("State")}
                                                                         value={this.props.event.state||"UPCOMING"}
                                                                         className="form-control"
                                                                         type="select"

                                                                >
                                                                    <option value={"UPCOMING"}>{this.props.t("Upcoming")}</option>
                                                                    <option value={"UNOFFICIAL"}>{this.props.t("Unofficial")}</option>
                                                                    <option value={"OFFICIAL"}>{this.props.t("Official")}</option>
                                                                </AvField>
                                                            </Col>

                                                            <Col>
                                                                <label className="control-label">
                                                                    {this.props.t("Description")}
                                                                </label>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={this.props.event.description}
                                                                    onChange={this.handleChangeDesc}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <hr/>
                                                                <label className="control-label">
                                                                    {this.props.t("Race briefing")}
                                                                </label>
                                                                <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={this.props.event.briefing}
                                                                    onChange={this.handleChangeBrief}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    <div className="button-items">
                                                        <Button className={"btn btn-sm btn-success"} type={"submit"}><i
                                                            className="mdi mdi-content-save font-size-16 align-middle me-2"/>{this.props.t("Save")}
                                                        </Button>
                                                        <Button className={"btn btn-sm btn-secondary"} onClick={this.toggleEdit}><i
                                                            className="mdi mdi-cancel font-size-16 align-middle me-2"/>{this.props.t("Cancel")}
                                                        </Button>
                                                    </div>
                                                    </AvForm>
                                                </Col>
                                                :
                                            <Col md={8}>
                                                <Row className={"mb-2"}>
                                                    <Col md={12}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Name")}:</Col>
                                                            <Col xs={8}><strong>{this.props.event.name}</strong></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-3"}>
                                                    <Col md={12}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Practice start")}:</Col>
                                                            <Col xs={8}>{moment(this.props.event.practiceStart).utc(false).format("D. M. yyyy")} - <b>{moment(this.props.event.practiceStart).utc(false).format("HH:mm")}</b></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-3"}>
                                                    <Col md={12}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Qualification start")}:</Col>
                                                            <Col xs={8}>{moment(this.props.event.qualifyStart).utc(false).format("D. M. yyyy")} - <b>{moment(this.props.event.qualifyStart).utc(false).format("HH:mm")}</b></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-3"}>
                                                    <Col md={12}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("Race start")}:</Col>
                                                            <Col xs={8}>{moment(this.props.event.raceStart).utc(false).format("D. M. yyyy")} - <b>{moment(this.props.event.raceStart).utc(false).format("HH:mm")}</b></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className={"mb-3"}>
                                                    <Col md={12}>
                                                        <Row>
                                                            <Col xs={4}>{this.props.t("State")}:</Col>
                                                            <Col xs={8}><EventStateBadge state={this.props.event.state}/></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row className={"mb-2"}>
                                                    <Col md={12}>
                                                        <hr/>
                                                        <Row>

                                                            <Col
                                                                xs={12}>
                                                                <div dangerouslySetInnerHTML={{ __html: this.props.event.description}}/>

                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                {this.props.event.briefing && this.props.event.briefing!=="" && this.checkBriefing()?
                                                <Row className={"mb-2"}>
                                                    <Col md={12}>
                                                        <hr/>
                                                        <Row>

                                                            <Col
                                                                xs={12}>
                                                                <h4>{this.props.t("Race briefing")}</h4>
                                                                <div dangerouslySetInnerHTML={{ __html: this.props.event.briefing}}/>

                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>:null}
                                                {this.props.user.role===ADMIN?
                                                <Row>
                                                    <Col className={"text-end"}>
                                                        <Button className={"btn-sm btn-info"} onClick={this.toggleEdit}><i
                                                            className="mdi mdi-pencil align-middle me-2"/>{this.props.t("Edit")}
                                                        </Button>
                                                    </Col>
                                                </Row>:null}
                                            </Col>}
                                            <Col md={4}>
                                                <EventImage />
                                            </Col>
                                        </Row>
                                        <Row>
                                            {this.props.event.id!==undefined && Number(this.props.match.params.eventId)===this.props.event.id  && (this.props.event.state!=="UPCOMING" || this.props.user.role===ADMIN )?
                                            <Col md={12} className={"mt-3"}>
                                                <EventResults />
                                            </Col>
                                                :null}
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
        event:state.Event.eventDetail,
        series:state.Series.seriesDetail,
        entries:state.Entry.entries,
        user:state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getSeriesDetail,getEventDetail,updateEvent,getEntries})(withTranslation()(EventDetail))
);
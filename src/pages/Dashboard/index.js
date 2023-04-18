import React, { Component } from "react"
import {
  Card, CardBody, CardHeader,
  Col,
  Container, Row,
} from "reactstrap"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAllLicenses} from "../../store/license/actions";
import {withTranslation} from "react-i18next";
import {getActiveSeries, getUpcomingEvents} from "../../store/dashboard/actions";
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";
import acc from "../../assets/images/sims/acc.png"
import rre from "../../assets/images/sims/rre.png"
import rf2 from "../../assets/images/sims/rF2.png"
import moment from "moment";


const sstyle ='.date-container{padding:8px;color:white;font-weight:700;position:absolute;bottom:90px;right:0;z-index:1}'


class Dashboard extends Component {

  componentDidMount() {
    this.props.getUpcomingEvents()
    this.props.getActiveSeries()
  }

  render() {
    const { history } = this.props
    return (
      <React.Fragment>
        <style>{sstyle}</style>
        <div className="page-content">
          <Container fluid>
            <h4>{this.props.t("Active Series")}</h4>
            <Row>
              {this.props.series.map((series,index)=>
                <Col xl="4" sm="6" key={"_col_" + index}>
                  <Card onClick={() =>
                      history.push("/series/"+series.id)
                  } outline style={{border:"1px solid "+series.color}}>
                    <CardBody>
                      <Link to={"/series/"+series.id}>
                        <div  className="product-img position-relative">
                          <img
                              src={API_URL + IMAGE_PROVIDER + series.image}
                              alt=""
                              className="img-fluid mx-auto d-block"
                          />
                          <div style={{height:"80px"}} className={"p-3 text-center"}>
                            {series.simulator==="RRE"?
                            <img src={rre}/>:null}
                            {series.simulator==="ACC"?
                                <img src={acc}/>:null}
                            {series.simulator==="RF2"?
                                <img src={rf2}/>:null}
                          </div>
                        </div>
                      </Link>

                      <div className="mt-4 text-center">
                        <h5 className="mb-3 text-truncate">
                          <Link
                              to={"/series/"+series.id}
                              className="text-dark"
                          >
                            {series.name}{" "}
                          </Link>
                        </h5>
                      </div>

                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
            <hr/>
            <h4>{this.props.t("Upcoming Events")}</h4>
            <Row>
              {this.props.events && this.props.events.map((event,index)=> {
                    let dateRaceStart = new Date(event.raceStart);

                    return <Col xl="3" sm="6" key={"_col_" + index}>
                      <Card onClick={() =>
                          history.push("/series/" + event.seriesId + "/event/" + event.id)
                      }  >
                        <CardHeader style={{background:event.series.color}}>
                        <div className="text-center text-white ">
                          <h6 className={"text-white mb-0"}>{event.series.name}</h6>
                        </div>
                        </CardHeader>
                        <CardBody >
                          <div className={"date-container"} style={{background: event.series.color}}>
                            {moment(event.raceStart).utc(false).format("D. M. yyyy")} - <b>{moment(event.raceStart).utc(false).format("HH:mm")}</b>
                          </div>
                          <Link to={"/series/" + event.seriesId + "/event/" + event.id}>
                            <div className="product-img position-relative">
                              <img
                                  src={API_URL + IMAGE_PROVIDER + event.image}
                                  alt=""
                                  className="img-fluid mx-auto d-block"
                              />

                            </div>
                          </Link>

                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <Link
                                  to={"/series/" + event.seriesId + "/event/" + event.id}
                                  className="text-dark"
                              >
                                {event.name}{" "}
                              </Link>
                            </h5>
                          </div>

                        </CardBody>
                      </Card>
                    </Col>
                  }
              )}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    events:state.Dashboard.upcomingEvents,
    series:state.Dashboard.activeSeries
  }
};

export default withRouter(
    connect(mapStateToProps, {getUpcomingEvents, getActiveSeries})(withTranslation()(Dashboard))
);

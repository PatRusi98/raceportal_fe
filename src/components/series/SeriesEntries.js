import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deleteSeries, getAllSeries} from "../../store/series/actions";
import {withTranslation} from "react-i18next";
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import SeriesMainManage from "./SeriesMainManage";
import SeriesEntriesManage from "./SeriesEntriesManage";
import SeriesEventsManage from "./SeriesEventsManage";

class SeriesEntries extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {

        return (
            <React.Fragment>
                <Row>

                </Row>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        series:state.Series.seriesDetail
    }
};
export default withRouter(
    connect(mapStateToProps, {deleteSeries})(withTranslation()(SeriesEntries))
);
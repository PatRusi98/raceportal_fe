import PropTypes from "prop-types"
import React, {Component} from "react"
import SimpleBar from "simplebar-react"
import {Link, withRouter} from "react-router-dom"

//i18n
import {withTranslation} from "react-i18next"
import {connect} from "react-redux"
import {getAllSeries} from "../../store/series/actions";

class SidebarContent extends Component {

    componentDidMount() {
        if (this.props.series.length === 0) {
            this.props.getAllSeries()
        }
    }

    render() {
        let activeSeries = this.props.series.filter((series) => series.state === "ACTIVE");
        let archiveSeries = this.props.series.filter((series) => series.state === "FINISHED");
        let openArchive = false
        archiveSeries.forEach((series) => {
            if (this.props.location.pathname.includes("series/" + series.id)) {
                openArchive = true;
            }
        })

        return (
            <React.Fragment>
                <SimpleBar style={{maxHeight: "100%"}}>
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                            <React.Fragment>
                                <li className="menu-title">Home</li>
                                <li className={(this.props.location.pathname.includes("dashboard") ? "mm-active" : "")}>
                                    <Link to={"/"} className={"metis-menu-second-level"}>
                                        <i className={"mdi mdi-desktop-mac-dashboard"}/>
                                        <span>{this.props.t("Dashboard")}</span>
                                    </Link>
                                </li>
                                <li className="menu-title">Series</li>
                                {activeSeries.map((series, index) =>
                                    <li key={index} className={(this.props.location.pathname.includes("series/" + series.id) ? "mm-active" : "")}>
                                        <Link to={"/series/" + series.id}
                                              className={"metis-menu-second-level"}>
                                            <i className={"mdi mdi-trophy"}/>
                                            <span>{series.name}</span>
                                        </Link>
                                    </li>
                                )}
                                {archiveSeries.length > 0 &&
                                <li className={(this.props.location.pathname.includes("menu 1") ? "mm-active" : "")}>
                                    <Link to={"/series/" + archiveSeries[0].id} className={"has-arrow metis-menu-second-level"}>
                                        <i className={"mdi mdi-archive"}/>
                                        <span>Archive</span>
                                    </Link>
                                    <ul className={"sub-menu mm-collapse" + (openArchive ? " mm-show" : "")}>
                                        {archiveSeries.map((series, index) =>
                                            <li key={index} className={(this.props.location.pathname.includes("series/" + series.id) ? "mm-active" : "")}>
                                                <Link to={"/series/" + series.id}>
                                                    <i className={"mdi mdi-trophy"}/>
                                                    <span>{series.name}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                }
                            </React.Fragment>
                        </ul>
                    </div>
                </SimpleBar>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.allSeries
    }
}


export default connect(
    mapStateToProps,
    {getAllSeries}
)(withRouter(withTranslation()(SidebarContent)))

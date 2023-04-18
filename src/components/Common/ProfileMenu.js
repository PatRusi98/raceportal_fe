import React, {Component} from "react"
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"
import {withRouter, Link} from "react-router-dom"

//i18n
import {withTranslation} from "react-i18next"

// users
import {connect} from "react-redux"
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";
import {ADMIN} from "../Role";

class ProfileMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu,
        }))
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <Dropdown
                    isOpen={this.state.menu}
                    toggle={this.toggle}
                    className="d-inline-block"
                >
                    <DropdownToggle
                        className="btn header-item"
                        id="page-header-user-dropdown"
                        tag="button"
                    >
                        <img
                            className="rounded-circle header-profile-user"
                            src={API_URL + IMAGE_PROVIDER + this.props.user.avatar}
                            alt="Header Avatar"
                        />{" "}
                        <span className="d-none d-xl-inline-block ms-1">
              {this.props.user.name}
            </span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                        <Link to={"/profile"} className="dropdown-item">
                            <i className="bx bx-user font-size-16 align-middle me-1"/>
                            {this.props.t("Profile")}
                        </Link>
                        {this.props.user.role===ADMIN?
                        <React.Fragment>
                            <div className="dropdown-divider"/>
                            <Link to={"/settings/users"} className="dropdown-item">
                                <i className="mdi mdi-account font-size-16 align-middle me-1"/>
                                {this.props.t("Users")}
                            </Link>
                            <Link to={"/settings/licenses"} className="dropdown-item">
                                <i className="mdi mdi-license font-size-16 align-middle me-1"/>
                                {this.props.t("Licenses")}
                            </Link>
                            <Link to={"/settings/series"} className="dropdown-item">
                                <i className="mdi mdi-trophy font-size-16 align-middle me-1"/>
                                {this.props.t("Series")}
                            </Link>
                            <Link to={"/settings/scoring"} className="dropdown-item">
                                <i className="mdi mdi-medal font-size-16 align-middle me-1"/>
                                {this.props.t("Scoring")}
                            </Link>
                            <Link to={"/settings/cars"} className="dropdown-item">
                                <i className="mdi mdi-car font-size-16 align-middle me-1"/>
                                {this.props.t("Cars")}
                            </Link>
                            {/*<DropdownItem tag="a" href="#">*/}
                            {/*    <span className="badge bg-success float-end">11</span>*/}
                            {/*    <i className="bx bx-wrench font-size-17 align-middle me-1"/>*/}
                            {/*    {this.props.t("Settings")}*/}
                            {/*</DropdownItem>*/}
                        </React.Fragment>:null}
                        <div className="dropdown-divider"/>
                        <Link to="/logout" className="dropdown-item">
                            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
                            <span>{this.props.t("Logout")}</span>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.Auth.user
    }
}


export default connect(mapStateToProps, null)(withRouter(withTranslation()(ProfileMenu)))

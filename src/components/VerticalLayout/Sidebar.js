import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"


import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import logo from "../../assets/images/logo.svg"
import logoLightPng from "../../assets/images/logo.png"
import logoLightSvg from "../../assets/images/logo.png"
import logoDark from "../../assets/images/logo.png"

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>

        <div className="vertical-menu">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-light">
              <span className="logo">
                <img src={logoLightPng} alt="" height={60} />
              </span>
            </Link>
          </div>
          <div data-simplebar className="h-100">
              <SidebarContent />
          </div>
          <div className="sidebar-background"></div>
        </div>
      </React.Fragment>
    )
  }
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStateToProps = state => {
  return {
  }
}
export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)))

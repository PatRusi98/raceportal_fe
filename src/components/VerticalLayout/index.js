import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"


// Layout Related Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      width: 0,
      height: 0
    }
    this.toggleMenuCallback = this.toggleMenuCallback.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  componentDidMount() {
    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }

    // Scroll Top to 0
    window.scrollTo(0, 0)
     let currentPage = this.capitalizeFirstLetter(this.props.location.pathname)


  }

  toggleMenuCallback = () => {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collapsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  render() {

    return (
      <React.Fragment>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
            </div>
          </div>
        </div>

        <div id="layout-wrapper">
          <Header
            toggleMenuCallback={this.toggleMenuCallback}
          />
          <Sidebar
            isMobile={this.state.isMobile}
            theme={"dark"}
          />
          <div className="main-content">{this.props.children}</div>
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.any,
  isPreloader: PropTypes.bool,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  toggleRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any
}

const mapStateToProps = state => {
  return {

  }
}
export default connect(mapStateToProps, {
})(withRouter(Layout))

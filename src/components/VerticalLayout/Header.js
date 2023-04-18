import PropTypes from "prop-types";
import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";


// Import menuDropdown
import LanguageDropdown from "../Common/LanguageDropdown";
import ProfileMenu from "../Common/ProfileMenu";



import logo from "../../assets/images/logo.png";
import logoLightSvg from "../../assets/images/logo.png";

//i18n
import { withTranslation } from "react-i18next";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      open: false,
      position: "right"
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }

  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  toogleTheme=()=>{
    let theme=localStorage.getItem("theme")
    //console.log(theme)
    if(theme==="light"){
      localStorage.setItem("theme","dark")
      window.location.reload()
    }else{
      localStorage.setItem("theme","light")
      window.location.reload()
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">

            <div className="d-flex">
              <div className="navbar-brand-box d-lg-none d-md-block">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                  </span>
                </Link>
              </div>

              {/*<button*/}
              {/*  type="button"*/}
              {/*  onClick={this.toggleMenu}*/}
              {/*  className="btn btn-sm px-3 font-size-16 header-item"*/}
              {/*  id="vertical-menu-btn"*/}
              {/*>*/}
              {/*  <i className="fa fa-fw fa-bars"></i>*/}
              {/*</button>*/}
            </div>
            <div className="d-flex">
              <LanguageDropdown />
              <div className="dropdown d-none d-lg-inline-block ms-1">
                {/*<button*/}
                {/*  type="button"*/}
                {/*  onClick={this.toggleFullscreen}*/}
                {/*  className="btn header-item noti-icon"*/}
                {/*  data-toggle="fullscreen"*/}
                {/*>*/}
                {/*  <i className="bx bx-fullscreen"></i>*/}
                {/*</button>*/}
              </div>
              <div className="dropdown d-none d-lg-inline-block ms-1">
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={this.toogleTheme}*/}
                {/*    className="btn header-item noti-icon"*/}
                {/*>*/}
                {/*  <i className="bx bx-bulb"></i>*/}
                {/*</button>*/}
              </div>
              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {}
};

export default connect(mapStatetoProps, {})(
  withTranslation()(Header)
);

Header.propTypes = {
  t: PropTypes.any,
  toggleMenuCallback: PropTypes.any
};
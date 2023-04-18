import React, { Component } from "react"
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import {Redirect, withRouter} from "react-router-dom"
import {logoutUser} from "../../store/auth/actions";



class Logout extends Component {
  /**
   * Redirect to login
   */
  componentDidMount = () => {
    this.props.logoutUser()

  }

  render() {
    return <React.Fragment><Redirect to={"/login"}/></React.Fragment>
  }
}


export default withRouter(connect(null, {logoutUser})(Logout))

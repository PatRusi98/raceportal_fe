import React, { Component } from "react"

import { BrowserRouter as Router, Switch } from "react-router-dom"

import { authProtectedRoutes, publicRoutes } from "./routes/"
import AppRoute from "./routes/route"

import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"



import ErrorHandler from "./components/Common/ErrorHandler";
import Light from "./components/Common/Light";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
      let theme = localStorage.getItem("theme")
      //console.log(theme)
    return (
        <React.Fragment>
            <Light />
          <Router>
            <Switch>
              {publicRoutes.map((route, idx) => (
                  <AppRoute
                      path={route.path}
                      layout={NonAuthLayout}
                      component={route.component}
                      key={idx}
                      isAuthProtected={false}
                  />
              ))}

              {authProtectedRoutes.map((route, idx) => (
                  <AppRoute
                      path={route.path}
                      layout={VerticalLayout}
                      component={route.component}
                      key={idx}
                      isAuthProtected={true}
                      exact
                  />
              ))}
            </Switch>
          </Router>
            <ErrorHandler ></ErrorHandler>
        </React.Fragment>
    )
  }
}


export default App

import React, { Component } from "react"
import { Row, Col } from "reactstrap"
import packageJson from '../../../package.json';

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container-fluid">
            <Row>
              <Col sm={6}>v{packageJson.version} | {new Date().getFullYear()} © Race Portal.</Col>
              <Col sm={6}>
                <div className="text-sm-end d-none d-sm-block">
                  Design by Maroš Hrušovský, develop by Patrik Rusiňák
              </div>
              </Col>
            </Row>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

export default Footer;
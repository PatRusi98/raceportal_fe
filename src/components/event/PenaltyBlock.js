import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import {Tooltip } from "reactstrap"


class PenaltyBlock extends Component {

  constructor(props) {
    super(props);
    this.state={
      open:false
    }
  }

  toggle = ()=>{
    this.setState({
      open:!this.state.open
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="mb-1" id={"penalty-"+this.props.penalty.id}>
          <span className="badge font-size-14" style={{background: "red"}}>
                  +{(this.props.penalty.value/1000).toFixed(0)}s
          </span>
        </div>

        <Tooltip className={"penalty-card-tooltip"} placement="left" isOpen={this.state.open} target={"penalty-"+this.props.penalty.id} toggle={this.toggle}>
          <div className={"text-start"}>
            <h5>{this.props.t("Priestupok")}</h5>
            <p dangerouslySetInnerHTML={{__html: this.props.penalty.reason}}/>
            <h5>{this.props.t("Rozhodnutie")}</h5>
            <p dangerouslySetInnerHTML={{__html: this.props.penalty.penalty}}/>
          </div>
        </Tooltip>
      </React.Fragment>)
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { })(withTranslation()(PenaltyBlock))

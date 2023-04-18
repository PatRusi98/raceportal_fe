import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {
    Button, Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    InputGroup,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {createScoring, setScoringDetail, updateScoring} from "../../store/scoring/actions";

class ScoringEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            raceTableRows: this.props.scoring.raceScoringCars||0,
            raceTable: this.props.scoring.raceScoring|| {},
            qualificationTableRows: this.props.scoring.qualificationScoringCars||0,
            qualificationTable: this.props.scoring.qualificationScoring||{},
            flTableRows: this.props.scoring.flScoringCars||0,
            flTable: this.props.scoring.flScoring||{}
        }

    }

    componentDidMount() {
        this.setState({
            raceTableRows: this.props.scoring.raceScoringCars||0,
            raceTable: this.props.scoring.raceScoring|| {},
            qualificationTableRows: this.props.scoring.qualificationScoringCars||0,
            qualificationTable: this.props.scoring.qualificationScoring||{},
            flTableRows: this.props.scoring.flScoringCars||0,
            flTable: this.props.scoring.flScoring||{}
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.scoring.id!==this.props.scoring.id){
            this.setState({
                raceTableRows: this.props.scoring.raceScoringCars||0,
                raceTable: this.props.scoring.raceScoring|| {},
                qualificationTableRows: this.props.scoring.qualificationScoringCars||0,
                qualificationTable: this.props.scoring.qualificationScoring||{},
                flTableRows: this.props.scoring.flScoringCars||0,
                flTable: this.props.scoring.flScoring||{}
            })
        }
    }

    save = (event, values) => {
        let data = {
            ...this.props.scoring,
            ...values,
            raceScoring: this.state.raceTable,
            qualificationScoring: this.state.qualificationTable,
            flScoring: this.state.flTable
        }
        if(data.id>0) {
            this.props.updateScoring(data)
        }else{
            this.props.createScoring(data)
        }
        this.props.setScoringDetail({})
    }

    changeRaceScoring = (e) => {
        let table = {};
        for (let i = 1; i <= Number(e.target.value); i++) {
            table[i] = 0
        }
        this.setState({
            raceTable: table,
            raceTableRows: e.target.value
        })
    }

    changeRacePositionPoints = (e, position) => {
        let table = this.state.raceTable;
        table[position] = e.target.value;
        this.setState({
            raceTable: table
        })
    }

    changeQualificationScoring = (e) => {
        let table = {};
        for (let i = 1; i <= Number(e.target.value); i++) {
            table[i] = 0
        }
        this.setState({
            qualificationTable: table,
            qualificationTableRows: e.target.value
        })
    }

    changeQualificationPositionPoints = (e, position) => {
        let table = this.state.qualificationTable;
        table[position] = e.target.value;
        this.setState({
            qualificationTable: table
        })
    }

    changeFLScoring = (e) => {
        let table = {};
        for (let i = 1; i <= Number(e.target.value); i++) {
            table[i] = 0
        }
        this.setState({
            flTable: table,
            flTableRows: e.target.value
        })
    }

    changeFLPositionPoints = (e, position) => {
        let table = this.state.flTable;
        table[position] = e.target.value;
        this.setState({
            flTable: table
        })
    }


    render() {

        let raceRows = [];
        for (let i = 1; i <= this.state.raceTableRows; i++) {
            raceRows.push(
                <tr key={i}>
                    <td>{i}.</td>
                    <td><Input bsSize={"sm"} value={this.state.raceTable[i]} onChange={(e) => this.changeRacePositionPoints(e, i)}/>
                    </td>
                </tr>
            )
        }
        let qualificationRows = [];
        for (let i = 1; i <= this.state.qualificationTableRows; i++) {
            qualificationRows.push(
                <tr key={i}>
                    <td>{i}.</td>
                    <td><Input bsSize={"sm"} value={this.state.qualificationTable[i]}
                               onChange={(e) => this.changeQualificationPositionPoints(e, i)}/></td>
                </tr>
            )
        }
        let flRows = [];
        for (let i = 1; i <= this.state.flTableRows; i++) {
            flRows.push(
                <tr key={i}>
                    <td>{i}.</td>
                    <td><Input bsSize={"sm"} value={this.state.flTable[i]} onChange={(e) => this.changeFLPositionPoints(e, i)}/></td>
                </tr>
            )
        }
        if(this.props.scoring.id===undefined){
            return null;
        }
        return (
            <Card>
                <CardBody>
                <AvForm className="form-horizontal" onValidSubmit={this.save}>
                    <Row>
                        <Col md={12}>
                            <AvField name="name"
                                     label={this.props.t("Name")}
                                     value={this.props.scoring.name||""}
                                     className="form-control"
                                     type="text"
                                     validate={{
                                         required: {
                                             value: true,
                                             errorMessage: 'Please enter a name'
                                         },
                                         minLength: {
                                             value: 3,
                                             errorMessage: 'Name must be between 3 and 255 characters'
                                         },
                                         maxLength: {
                                             value: 255,
                                             errorMessage: 'Name must be between 3 and 255 characters'
                                         }
                                     }}
                                     required

                            />
                        </Col>
                        <Col md={4}>
                            <h4>{this.props.t("Race")}</h4>
                            <AvField name="raceScoringCars"
                                     label={this.props.t("Scoring cars in race")}
                                     value={this.props.scoring.raceScoringCars||0+""}
                                     className="form-control"
                                     type="number"
                                     onChange={this.changeRaceScoring}

                            />
                            <hr/>
                            {this.state.raceTableRows > 0 &&
                            <div className={"table-responsive"}>
                                <table className={"table table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th>{this.props.t("Position")}</th>
                                        <th>{this.props.t("Points")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {raceRows.map((position, index) =>
                                        position
                                    )}
                                    </tbody>
                                </table>

                            </div>}
                        </Col>
                        <Col md={4}>
                            <h4>{this.props.t("Qualification")}</h4>
                            <AvField name="qualificationScoringCars"
                                     label={this.props.t("Scoring cars in qualification")}
                                     value={this.props.scoring.qualificationScoringCars||0+""}
                                     className="form-control"
                                     type="number"
                                     onChange={this.changeQualificationScoring}

                            />
                            <hr/>
                            {this.state.qualificationTableRows > 0 &&
                            <div className={"table-responsive"}>
                                <table className={"table table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th>{this.props.t("Position")}</th>
                                        <th>{this.props.t("Points")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {qualificationRows.map((position, index) =>
                                        position
                                    )}
                                    </tbody>
                                </table>
                            </div>}
                        </Col>
                        <Col md={4}>
                            <h4>{this.props.t("Fast lap")}</h4>
                            <AvField name="flScoringCars"
                                     label={this.props.t("Scoring cars for Fast lap")}
                                     value={this.props.scoring.flScoringCars||0+""}
                                     className="form-control"
                                     type="number"
                                     onChange={this.changeFLScoring}

                            />
                            <hr/>
                            {this.state.flTableRows > 0 &&
                            <div className={"table-responsive"}>
                                <table className={"table table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th>{this.props.t("Position")}</th>
                                        <th>{this.props.t("Points")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {flRows.map((position, index) =>
                                        position
                                    )}
                                    </tbody>
                                </table>
                            </div>}
                        </Col>
                    </Row>
                    <div className="text-end mt-2">
                        <Button color={"success"} type={"submit"}>{this.props.t("Save")}</Button>
                        <Button color={"secondary"} onClick={()=>this.props.setScoringDetail({})}>{this.props.t("Cancel")}</Button>
                    </div>
                </AvForm>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        scoring: state.Scoring.scoringDetail
    }
};
export default withRouter(
    connect(mapStateToProps, {updateScoring,createScoring,setScoringDetail})(withTranslation()(ScoringEdit))
);
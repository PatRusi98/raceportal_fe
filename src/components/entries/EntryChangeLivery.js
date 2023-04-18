import React, {Component} from 'react';
import {Button, Col, Input} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {editUser, uploadAvatar} from "../../store/auth/actions";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";
import {setEntryImage} from "../../store/entry/actions";

class EntryChangeLivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: undefined,
            edit: false
        }
    }

    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });

    };
    save = () => {
        const formData = new FormData();
        if (this.state.selectedFile.size > 900000) {
            alert(this.props.t("Max filesize for livery is 800kB"))
            return;
        }
        formData.append('file', this.state.selectedFile);
        this.props.setEntryImage(this.props.series,this.props.entry, formData,this.props.history)
        this.toggleEdit()
    }
    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <Col md={12}>
                <h3>{this.props.t("Change livery")}</h3>
                <img
                    src={API_URL + IMAGE_PROVIDER + this.props.entry.image}
                    alt=""
                    className="img-fluid"
                />
                <div className={"text-end"}>
                    {this.state.edit ?
                        <div className="input-group  mt-3">
                            <Input type="file" className="form-control" onChange={this.onFileChangeHandler}/>
                            <Button color="success" type="button"
                                    onClick={this.save}>{this.props.t("Save")}</Button>
                            <Button color="secondary" type="button"
                                    onClick={this.toggleEdit}>{this.props.t("X")}</Button>
                        </div>
                        : <Button color="info" type="button" className={" mt-3"}
                                  onClick={this.toggleEdit}>{this.props.t("Change livery")}</Button>
                    }

                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        entry: state.Entry.entry,
        series: state.Series.seriesDetail
    }
};

export default withRouter(
    connect(mapStateToProps, {setEntryImage})(withTranslation()(EntryChangeLivery))
);
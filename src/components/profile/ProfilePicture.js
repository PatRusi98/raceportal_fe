import React, {Component} from 'react';
import {Button, Col, Input} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {editUser, uploadAvatar} from "../../store/auth/actions";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {API_URL, IMAGE_PROVIDER} from "../../helpers/api_helper";

class ProfilePicture extends Component {

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
        formData.append('file', this.state.selectedFile);
        this.props.uploadAvatar(this.props.user, formData)
        this.toggleEdit()
    }
    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <Col md={3}>
                <img
                    src={API_URL + IMAGE_PROVIDER + this.props.user.avatar}
                    alt=""
                    className="img-fluid"
                />
                <div className={"text-end"}>
                    {this.state.edit ?
                        <div className="input-group input-group-sm mt-3">
                            <Input type="file" className="form-control" onChange={this.onFileChangeHandler}/>
                            <Button color="success" type="button"
                                    onClick={this.save}>{this.props.t("Save")}</Button>
                            <Button color="secondary" type="button"
                                    onClick={this.toggleEdit}>{this.props.t("X")}</Button>
                        </div>
                        : <Button color="info" type="button" className={"btn-sm mt-3"}
                                  onClick={this.toggleEdit}>{this.props.t("Change avatar")}</Button>
                    }

                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {uploadAvatar})(withTranslation()(ProfilePicture))
);
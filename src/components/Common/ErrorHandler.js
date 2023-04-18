import React, {Component} from 'react';
import toastr from "toastr";
import "toastr/build/toastr.min.css";


class ErrorHandler extends Component {

    componentDidMount() {

        window.addEventListener('successAPICall', function (e) {
            toastr.success(e.detail.message, e.detail.title)
        }, false);
        window.addEventListener('errorAPICall', function (e) {
            toastr.error(e.detail.message, e.detail.title)
        }, false);
    }


    render() {
        return (
            <div>
            </div>
        );
    }
}

export default ErrorHandler;
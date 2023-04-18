import React, {Component} from 'react';
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getEntries, setEntry} from "../../store/entry/actions";
import {withTranslation} from "react-i18next";

class EntryContainer extends Component {

    componentDidMount() {
        this.props.getEntries(this.props.series)
        this.props.setEntry({})
    }


    check(){
        let showReg=true;
        this.props.entries.forEach(entry=>{
            entry.drivers.forEach(driver=>{
                if(driver.id===this.props.user.id){
                    showReg=false
                }
            })
        })
        return showReg;
    }

    render() {
        return (
            <div>
                <EntryForm/>
                <EntryList/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        series: state.Series.seriesDetail,
        entries: state.Entry.entries,
        user: state.Auth.user
    }
};

export default withRouter(
    connect(mapStateToProps, {getEntries,setEntry})(withTranslation()(EntryContainer))
);
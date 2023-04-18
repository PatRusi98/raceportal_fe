import React, {Component} from 'react';
import acc from "../../assets/images/sims/acc.png";
import rre from "../../assets/images/sims/rre.png";

class StateColumn extends Component {

    render() {
        let content=""
        switch (this.props.state){
            case "FINISHED":
                content = <span className="badge bg-success font-size-14">Finished</span>
                break
            case "ACTIVE":
                content = <span className="badge bg-info font-size-14">Active</span>
                break
            case "PREPARING":
                content = <span className="badge bg-warning font-size-14">Preparing</span>
                break
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default StateColumn;
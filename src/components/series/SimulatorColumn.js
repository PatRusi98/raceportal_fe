import React, {Component} from 'react';
import acc from "../../assets/images/sims/acc.png";
import rre from "../../assets/images/sims/rre.png";
import rf2 from "../../assets/images/sims/rF2.png";

class SimulatorColumn extends Component {

    render() {
        let content=""
        switch (this.props.simulator){
            case "ACC":
                content = <img height={30} src={acc}/>
                break
            case "RRE":
                content = <img height={20} src={rre}/>
                break
            case "RF2":
                content = <img height={20} src={rf2}/>
                break
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default SimulatorColumn;
import rre from "../../assets/images/sims/rre.png";
import acc from "../../assets/images/sims/acc.png";
import rf2 from "../../assets/images/sims/rF2.png";
import {components} from "react-select";
import React from "react";

export const SimOption = props => {
    let content = "";
    switch (props.data.value) {
        case "RRE":
            content = <img height={20} src={rre}/>
            break
        case  "ACC":
            content = <img height={20} src={acc}/>
            break
        case  "RF2":
            content = <img height={20} src={rf2}/>
            break
    }

    return (

            <components.Option {...props} >
                {content}
            </components.Option>
    );
};

export const SingleValue = (props) => {
    let content = "";

    switch (props.data.value) {
        case "RRE":
            content = <img height={20} src={rre}/>
            break
        case  "ACC":
            content = <img height={20} src={acc}/>
            break
        case  "RF2":
            content = <img height={20} src={rf2}/>
            break
    }

    return (
        <components.SingleValue  {...props} >
            {content}
        </components.SingleValue >
    );
};

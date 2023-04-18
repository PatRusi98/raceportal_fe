import { combineReducers } from "redux"
import Auth from "./auth/reducer";
import Series from "./series/reducer";
import Scoring from "./scoring/reducer";
import Car from "./car/reducer";
import Event from "./event/reducer";
import License from "./license/reducer";
import User from "./user/reducer";
import Dashboard from "./dashboard/reducer";
import Entry from "./entry/reducer";

const rootReducer = combineReducers({
    Auth,
    Series,
    Scoring,
    Car,
    Event,
    License,
    User,
    Dashboard,
    Entry
})

export default rootReducer

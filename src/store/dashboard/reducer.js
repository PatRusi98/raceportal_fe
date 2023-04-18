import {SET_ACTIVE_SERIES, SET_EVENT_DETAIL, SET_SERIES_EVENTS, SET_UPCOMING_EVENTS} from "./actionTypes";

const initialState = {
  activeSeries:[],
  upcomingEvents:[]

}

const Dashboard = (state = initialState, action) => {
  let classes=[];
  switch (action.type) {
    case SET_UPCOMING_EVENTS:
      state = {...state,upcomingEvents: action.payload}
      break
    case SET_ACTIVE_SERIES:
      state = {...state,activeSeries: action.payload}
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Dashboard

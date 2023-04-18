import {SET_EVENT_DETAIL, SET_EVENT_RESULTS, SET_SERIES_EVENTS} from "./actionTypes";

const initialState = {
  seriesEvents:[],
  eventDetail:{},
  eventResults:[]

}

const Event = (state = initialState, action) => {
  let classes=[];
  switch (action.type) {
    case SET_SERIES_EVENTS:
      state = {...state,seriesEvents: action.payload}
      break
    case SET_EVENT_DETAIL:
      state = {...state,eventDetail: action.payload}
      break
    case SET_EVENT_RESULTS:
      state = {...state,eventResults: action.payload}
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Event

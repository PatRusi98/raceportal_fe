import {

  GET_ACTIVE_SERIES,
  GET_UPCOMING_EVENTS, SET_ACTIVE_SERIES,
  SET_UPCOMING_EVENTS,


} from "./actionTypes"


export const getUpcomingEvents = (payload) => {
  return {
    type: GET_UPCOMING_EVENTS,
    payload: payload,
  }
}

export const setUpcomingEvents = (payload) => {
  return {
    type: SET_UPCOMING_EVENTS,
    payload: payload,
  }
}
export const getActiveSeries = (payload) => {
  return {
    type: GET_ACTIVE_SERIES,
    payload: payload,
  }
}
export const setActiveSeries = (payload) => {
  return {
    type: SET_ACTIVE_SERIES,
    payload: payload,
  }
}
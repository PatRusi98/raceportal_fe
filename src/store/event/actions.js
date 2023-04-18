import {
  ADD_RESULT_PENALTY,
  CREATE_EVENT,
  DELETE_EVENT, DELETE_RESULT,
  GET_EVENT_DETAIL, GET_EVENT_RESULTS,
  GET_SERIES_EVENTS,
  SET_EVENT_DETAIL, SET_EVENT_RESULTS,
  SET_SERIES_EVENTS, UPDATE_EVENT,
  UPLOAD_EVENT_IMAGE,
  UPLOAD_RESULT

} from "./actionTypes"

export const createEvent = (payload) => {
  return {
    type: CREATE_EVENT,
    payload: payload,
  }
}
export const updateEvent = (payload) => {
  return {
    type: UPDATE_EVENT,
    payload: payload,
  }
}
export const deleteEvent = (payload) => {
  return {
    type: DELETE_EVENT,
    payload: payload,
  }
}
export const uploadEventImage = (event, formData) => {
  return {
    type: UPLOAD_EVENT_IMAGE,
    payload: {event,formData},
  }
}
export const uploadResult = (event, formData) => {
  return {
    type: UPLOAD_RESULT,
    payload: {event,formData},
  }
}

export const getSeriesEvents = (payload) => {
  return {
    type: GET_SERIES_EVENTS,
    payload: payload,
  }
}

export const setSeriesEvents = (payload) => {
  return {
    type: SET_SERIES_EVENTS,
    payload: payload,
  }
}
export const getEventDetail = (payload) => {
  return {
    type: GET_EVENT_DETAIL,
    payload: payload,
  }
}
export const setEventDetail = (payload) => {
  return {
    type: SET_EVENT_DETAIL,
    payload: payload,
  }
}
export const getEventResults = (payload) => {
  return {
    type: GET_EVENT_RESULTS,
    payload: payload,
  }
}

export const setEventResults = (payload) => {
  return {
    type: SET_EVENT_RESULTS,
    payload: payload,
  }
}
export const deleteEventResults = (payload) => {
  return {
    type: DELETE_RESULT,
    payload: payload,
  }
}
export const addResultPenalty = (payload) => {
  return {
    type: ADD_RESULT_PENALTY,
    payload: payload,
  }
}
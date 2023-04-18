import {
  ADD_CAR_CLASS,
  GET_STANDINGS,
  SET_STANDINGS,
  CREATE_CAR_CLASS,
  CREATE_SERIES,
  DELETE_CAR_CLASS,
  DELETE_SERIES,
  GET_ALL_SERIES,
  GET_SERIES_DETAIL,
  REMOVE_CAR_CLASS,
  SET_ALL_SERIES,
  SET_SERIES_DETAIL,
  UPDATE_CAR_CLASS,
  UPDATE_SERIES, UPLOAD_SERIES_IMAGE

} from "./actionTypes"

export const getAllSeries = (payload) => {
  return {
    type: GET_ALL_SERIES,
    payload: payload,
  }
}

export const setAllSeries = (payload) => {
  return {
    type: SET_ALL_SERIES,
    payload: payload,
  }
}
export const getSeriesDetail = (payload) => {
  return {
    type: GET_SERIES_DETAIL,
    payload: payload,
  }
}

export const setSeriesDetail = (payload) => {
  return {
    type: SET_SERIES_DETAIL,
    payload: payload,
  }
}
export const createSeries = (payload) => {
  return {
    type: CREATE_SERIES,
    payload: payload,
  }
}
export const updateSeries = (payload) => {
  return {
    type: UPDATE_SERIES,
    payload: payload,
  }
}
export const deleteSeries = (payload) => {
  return {
    type: DELETE_SERIES,
    payload: payload,
  }
}
export const createCarClass = (payload) => {
  return {
    type: CREATE_CAR_CLASS,
    payload: payload,
  }
}
export const updateCarClass = (payload) => {
  return {
    type: UPDATE_CAR_CLASS,
    payload: payload,
  }
}
export const deleteCarClass = (payload) => {
  return {
    type: DELETE_CAR_CLASS,
    payload: payload,
  }
}
export const addCarClass = (payload) => {
  return {
    type: ADD_CAR_CLASS,
    payload: payload,
  }
}
export const removeCarClass = (payload) => {
  return {
    type: REMOVE_CAR_CLASS,
    payload: payload,
  }
}
export const getStandings = (payload) => {
  return {
    type: GET_STANDINGS,
    payload: payload,
  }
}
export const setStandings = (payload) => {
  return {
    type: SET_STANDINGS,
    payload: payload,
  }
}
export const uploadSeriesImage = (series,formData) => {
  return {
    type: UPLOAD_SERIES_IMAGE,
    payload: {series,formData},
  }
}



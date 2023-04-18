import {
  CREATE_SCORING, DELETE_SCORING,
  GET_ALL_SCORING, GET_SCORING_DETAIL, SET_ALL_SCORING, SET_SCORING_DETAIL, UPDATE_SCORING

} from "./actionTypes"

export const getAllScoring = (payload) => {
  return {
    type: GET_ALL_SCORING,
    payload: payload,
  }
}

export const setAllScoring = (payload) => {
  return {
    type: SET_ALL_SCORING,
    payload: payload,
  }
}
export const getScoringDetail = (payload) => {
  return {
    type: GET_SCORING_DETAIL,
    payload: payload,
  }
}

export const setScoringDetail = (payload) => {
  return {
    type: SET_SCORING_DETAIL,
    payload: payload,
  }
}
export const createScoring = (payload) => {
  return {
    type: CREATE_SCORING,
    payload: payload,
  }
}
export const updateScoring = (payload) => {
  return {
    type: UPDATE_SCORING,
    payload: payload,
  }
}
export const deleteScoring = (payload) => {
  return {
    type: DELETE_SCORING,
    payload: payload,
  }
}


import {
  ADD_LICENSE_TO_USER,
  GET_ALL_USERS, GET_USER_DETAIL, REMOVE_LICENSE_FROM_USER, SET_ALL_USERS, SET_USER_DETAIL

} from "./actionTypes"

export const getAllUsers = (payload) => {
  return {
    type: GET_ALL_USERS,
    payload: payload,
  }
}
export const setAllUsers = (payload) => {
  return {
    type: SET_ALL_USERS,
    payload: payload,
  }
}
export const getUserDetail = (payload) => {
  return {
    type: GET_USER_DETAIL,
    payload: payload,
  }
}
export const setUserDetail = (payload) => {
  return {
    type: SET_USER_DETAIL,
    payload: payload,
  }
}
export const addLicenseToUser = (payload) => {
  return {
    type: ADD_LICENSE_TO_USER,
    payload: payload,
  }
}
export const removeLicenseFromUser = (payload) => {
  return {
    type: REMOVE_LICENSE_FROM_USER,
    payload: payload,
  }
}
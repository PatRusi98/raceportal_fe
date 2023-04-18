import {
  CREATE_LICENSE, DELETE_LICENSE,
  GET_ALL_LICENSES,
  GET_LICENSE_DETAIL,
  SET_ALL_LICENSES,
  SET_LICENSE_DETAIL, UPDATE_LICENSE,

} from "./actionTypes"

export const getAllLicenses = (payload) => {
  return {
    type: GET_ALL_LICENSES,
    payload: payload,
  }
}

export const setAllLicenses = (payload) => {
  return {
    type: SET_ALL_LICENSES,
    payload: payload,
  }
}

export const getLicenseDetail = (payload) => {
  return {
    type: GET_LICENSE_DETAIL,
    payload: payload,
  }
}

export const setLicenseDetail = (payload) => {
  return {
    type: SET_LICENSE_DETAIL,
    payload: payload,
  }
}

export const createLicense = (payload) => {
  return {
    type: CREATE_LICENSE,
    payload: payload,
  }
}

export const updateLicense = (payload) => {
  return {
    type: UPDATE_LICENSE,
    payload: payload,
  }
}

export const deleteLicense = (payload) => {
  return {
    type: DELETE_LICENSE,
    payload: payload,
  }
}
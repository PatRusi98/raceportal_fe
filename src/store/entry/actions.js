import {
  APPROVE_ENTRY,
  EDIT_ENTRY,
  GET_ENTRIES, GET_ENTRY,
  REGISTER_ENTRY, SET_ENTRIES, SET_ENTRY, SET_ENTRY_IMAGE
} from "./actionTypes"


export const registerEntry = (series, formData) => {
  return {
    type: REGISTER_ENTRY,
    payload: {series, formData},
  }
}
export const editEntry = (series, data,history) => {
  return {
    type: EDIT_ENTRY,
    payload: {series, data,history},
  }
}

export const getEntries = (payload) => {
  return {
    type: GET_ENTRIES,
    payload: payload,
  }
}

export const setEntries = (payload) => {
  return {
    type: SET_ENTRIES,
    payload: payload,
  }
}

export const getEntry = (payload) => {
  return {
    type: GET_ENTRY,
    payload: payload,
  }
}

export const setEntry = (payload) => {
  return {
    type: SET_ENTRY,
    payload: payload,
  }
}
export const setEntryImage = (series,entry,formData,history) => {
  return {
    type: SET_ENTRY_IMAGE,
    payload: {series,entry,formData,history},
  }
}
export const approveEntry = (payload) => {
  return {
    type: APPROVE_ENTRY,
    payload: payload,
  }
}

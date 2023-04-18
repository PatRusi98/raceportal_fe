import {
  LOGIN,
  REGISTER,
  LOGIN_ERROR, LOGOUT, EDIT_USER, SET_USER, UPLOAD_AVATAR
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN,
    payload: { user, history },
  }
}
export const registerUser = (user, history) => {
  return {
    type: REGISTER,
    payload: { user, history },
  }
}

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  }
}

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  }
}
export const logoutUser = user => {
  return {
    type: LOGOUT,
    payload: user,
  }
}
export const editUser = user => {
  return {
    type: EDIT_USER,
    payload: user,
  }
}
export const uploadAvatar = (user,formData) => {
  return {
    type: UPLOAD_AVATAR,
    payload: {user,formData},
  }
}


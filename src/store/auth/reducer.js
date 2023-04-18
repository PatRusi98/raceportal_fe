import {LOGIN_ERROR, LOGOUT, SET_USER, UPLOAD_AVATAR} from "./actionTypes";

const initialState = {
  user:JSON.parse(localStorage.getItem("user"))||{},
  error:{}

}

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case  SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload))
      state={...state,error: {},user:action.payload}
          break
    case LOGIN_ERROR:{
      state={...state,user: {},error:action.payload}
      break
    }
    case LOGOUT:{
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("expiration")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("expirationRefresh")
      state={...state,user: {},error:{}}
      break
    }
    default:
      state = { ...state }
      break
  }
  return state
}

export default Auth

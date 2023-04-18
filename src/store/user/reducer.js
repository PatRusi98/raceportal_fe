import {SET_ALL_USERS, SET_USER_DETAIL} from "./actionTypes";

const initialState = {
  allUsers:[],
  userDetail:{}

}

const User = (state = initialState, action) => {
  let classes=[];
  switch (action.type) {
    case SET_ALL_USERS:
      state = {...state,allUsers: action.payload}
      break
    case SET_USER_DETAIL:
      state = {...state,userDetail: action.payload}
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default User

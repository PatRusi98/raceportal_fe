import {SET_ENTRIES, SET_ENTRY} from "./actionTypes";

const initialState = {
    entries:[],
  entry:{}
}

const Entry = (state = initialState, action) => {

  switch (action.type) {
    case SET_ENTRIES:
      state = { ...state,entries:action.payload }
      break
    case SET_ENTRY:
      state = { ...state,entry:action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Entry

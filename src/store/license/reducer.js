import {SET_ALL_LICENSES, SET_LICENSE_DETAIL} from "./actionTypes";

const initialState = {
  allLicenses:[],
  licenseDetail:{}

}

const License = (state = initialState, action) => {
  let classes=[];
  switch (action.type) {
    case SET_ALL_LICENSES:
      state = {...state,allLicenses: action.payload}
      break
    case SET_LICENSE_DETAIL:
      state = {...state,licenseDetail: action.payload}
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default License

import {ADD_CAR_CLASS, REMOVE_CAR_CLASS, SET_ALL_SERIES, SET_SERIES_DETAIL, SET_STANDINGS} from "./actionTypes";

const initialState = {
  allSeries:[],
  seriesDetail:{},
  standings:{}

}

const Series = (state = initialState, action) => {
  let classes=[];
  switch (action.type) {
    case  SET_ALL_SERIES:
      state={...state,allSeries:action.payload}
          break
    case  SET_SERIES_DETAIL:
      state={
        ...state,
        seriesDetail:action.payload
      }
      break
    case  SET_STANDINGS:
      state={
        ...state,
        standings:action.payload
      }
      break
    case  ADD_CAR_CLASS:
      classes=state.seriesDetail.classes||[]
      classes.push({id:0})
      state={
        ...state,
        seriesDetail:{...state.seriesDetail,classes:classes}
      }
      break
    case  REMOVE_CAR_CLASS:
      classes=state.seriesDetail.classes
      classes.splice(action.payload.index,1)
      state={
        ...state,
        seriesDetail:{...state.seriesDetail,classes:classes}
      }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default Series

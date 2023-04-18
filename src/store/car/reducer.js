import {SET_ALL_CARS, SET_CAR_DETAIL} from "./actionTypes";

const initialState = {
  allCars:[],
  carDetail:{}

}

const Car = (state = initialState, action) => {
  switch (action.type) {
    case  SET_ALL_CARS:
      state={...state,allCars:action.payload}
          break
    case  SET_CAR_DETAIL:
      state={...state,scoringDetail:action.payload}
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Car

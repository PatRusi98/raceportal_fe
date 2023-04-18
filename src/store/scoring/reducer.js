import {SET_ALL_SCORING, SET_SCORING_DETAIL} from "./actionTypes";

const initialState = {
  allScoring:[],
  scoringDetail:{}

}

const Scoring = (state = initialState, action) => {
  switch (action.type) {
    case  SET_ALL_SCORING:
      state={...state,allScoring:action.payload}
          break
    case  SET_SCORING_DETAIL:
      state={...state,scoringDetail:action.payload}
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default Scoring

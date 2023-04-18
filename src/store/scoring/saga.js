import { takeEvery, put, call } from "redux-saga/effects"


import {CREATE_SCORING, DELETE_SCORING, GET_ALL_SCORING, GET_SCORING_DETAIL, UPDATE_SCORING} from "./actionTypes"
import {setAllScoring, getAllScoring as rGetAllScoring, setScoringDetail} from "./actions"
import {createScoring, deleteScoring, getAllScoring, getScoringDetail, updateScoring} from "../../helpers/backend_calls";
import {callError, callSuccess} from "../../components/Common/ErrorTools";



function* sGetAllScoring() {
  try {
    const response = yield call(getAllScoring)
    yield put(setAllScoring(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sCreateScoring({payload}) {
  try {
    const response = yield call(createScoring,payload)
    yield put(rGetAllScoring())
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sUpdateScoring({payload}) {
  try {
    const response = yield call(updateScoring,payload)
    //yield put(setScoringDetail(response))
    yield put(rGetAllScoring())
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sDeleteScoring({payload}) {
  try {
    const response = yield call(deleteScoring,payload)
    yield put(rGetAllScoring())
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetScoringDetail({payload}) {
  try {
    const response = yield call(getScoringDetail,payload)
    yield put(setScoringDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* scoringSaga() {
  yield takeEvery(GET_ALL_SCORING, sGetAllScoring)
  yield takeEvery(CREATE_SCORING, sCreateScoring)
  yield takeEvery(UPDATE_SCORING, sUpdateScoring)
  yield takeEvery(DELETE_SCORING, sDeleteScoring)
  yield takeEvery(GET_SCORING_DETAIL, sGetScoringDetail)
}

export default scoringSaga

import { takeEvery, put, call } from "redux-saga/effects"


import {
  ADD_RESULT_PENALTY,
  CREATE_EVENT,
  DELETE_EVENT, DELETE_RESULT,
  GET_EVENT_DETAIL,
  GET_EVENT_RESULTS,
  GET_SERIES_EVENTS,
  UPDATE_EVENT,
  UPLOAD_EVENT_IMAGE,
  UPLOAD_RESULT
} from "./actionTypes"

import {
  addResultPenalty,
  createEvent,
  deleteEvent, deleteEventResults,
  getEventDetail,
  getEventResults,
  getSeriesEvents,
  updateEvent,
  uploadEventImage,
  uploadResult
} from "../../helpers/backend_calls";
import {getSeriesEvents as rGetSeriesEvents, setEventDetail, setEventResults, setSeriesEvents} from "./actions";
import {callError, callSuccess} from "../../components/Common/ErrorTools";


function* sGetEventDetail({payload}) {
  try {
    const response = yield call(getEventDetail,payload)
    yield put(setEventDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sUploadEventImage({payload}) {
  try {
    const response = yield call(uploadEventImage,payload)
    yield put(setEventDetail(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sUploadResult({payload}) {
  try {
    const response = yield call(uploadResult,payload)
    //console.log(response)
    yield put(setEventResults(response))
    callSuccess("Result was uploaded", "Uploaded")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sCreateEvent({payload}) {
  try {
    const response = yield call(createEvent,payload)
    yield put(rGetSeriesEvents({id:payload.seriesId}))
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sUpdateEvent({payload}) {
  try {
    const response = yield call(updateEvent,payload)
    yield put(setEventDetail(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sDeleteEvent({payload}) {
  try {
    const response = yield call(deleteEvent,payload)
    yield put(rGetSeriesEvents({id:payload.seriesId}))
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sGetSeriesEvents({payload}) {
  try {
    const response = yield call(getSeriesEvents,payload)
    yield put(setSeriesEvents(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sGetEventResults({payload}) {
  try {
    const response = yield call(getEventResults,payload)
    //console.log(response)
    yield put(setEventResults(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sDeleteResult({payload}) {
  try {
    const response = yield call(deleteEventResults,payload)
    //console.log(response)
    yield put(setEventResults(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sAddResultPenalty({payload}) {
  try {
    const response = yield call(addResultPenalty,payload)
    //console.log(response)
    yield put(setEventResults(response))
    callSuccess("Penalty added", "Added")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* eventSaga() {
  yield takeEvery(CREATE_EVENT, sCreateEvent)
  yield takeEvery(UPDATE_EVENT, sUpdateEvent)
  yield takeEvery(DELETE_EVENT, sDeleteEvent)
  yield takeEvery(UPLOAD_EVENT_IMAGE, sUploadEventImage)
  yield takeEvery(GET_EVENT_DETAIL, sGetEventDetail)
  yield takeEvery(GET_SERIES_EVENTS, sGetSeriesEvents)
  yield takeEvery(UPLOAD_RESULT, sUploadResult)
  yield takeEvery(GET_EVENT_RESULTS, sGetEventResults)
  yield takeEvery(DELETE_RESULT, sDeleteResult)
  yield takeEvery(ADD_RESULT_PENALTY, sAddResultPenalty)
}

export default eventSaga

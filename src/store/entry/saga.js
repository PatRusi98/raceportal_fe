import { takeEvery, put, call } from "redux-saga/effects"


import {
  APPROVE_ENTRY,
  EDIT_ENTRY,
  GET_ENTRIES, GET_ENTRY,
  REGISTER_ENTRY, SET_ENTRY, SET_ENTRY_IMAGE
} from "./actionTypes"

import {
  approveEntry,
  getEntries, getEntry,
  registerEntry, updateEntry, uploadEntryImage
} from "../../helpers/backend_calls";
import {getEntries as rGetEntries, setEntries, setEntry} from "./actions";
import {callError, callSuccess} from "../../components/Common/ErrorTools";


function* sRegisterEntry({payload}) {
  try {
    const response = yield call(registerEntry,payload)
    yield put(rGetEntries(payload.series))
    callSuccess("Registration was successful", "Success")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sEditEntry({payload}) {
  try {
    const response = yield call(updateEntry,payload)
    yield put(setEntry(response))
    payload.history.push("/series/"+payload.series.id+"/entries")
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sSetEntryImage({payload}) {
  try {
    const response = yield call(uploadEntryImage,payload)
    yield put(setEntry(response))
    payload.history.push("/series/"+payload.series.id+"/entries")
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetEntries({payload}) {
  try {
    const response = yield call(getEntries,payload)
    yield put(setEntries(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetEntry({payload}) {
  try {
    const response = yield call(getEntry,payload)
    yield put(setEntry(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sApproveEntry({payload}) {
  try {
    const response = yield call(approveEntry,payload)
    yield put(rGetEntries(payload.series))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* entrySaga() {
  yield takeEvery(REGISTER_ENTRY, sRegisterEntry)
  yield takeEvery(EDIT_ENTRY, sEditEntry)
  yield takeEvery(SET_ENTRY_IMAGE, sSetEntryImage)
  yield takeEvery(GET_ENTRIES, sGetEntries)
  yield takeEvery(GET_ENTRY, sGetEntry)
  yield takeEvery(APPROVE_ENTRY, sApproveEntry)
}

export default entrySaga

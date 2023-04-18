import { takeEvery, put, call } from "redux-saga/effects"


import {
  GET_ACTIVE_SERIES,
  GET_UPCOMING_EVENTS
} from "./actionTypes"

import {
  getActiveSeries,getUpcomingEvents
} from "../../helpers/backend_calls";
import {setActiveSeries, setUpcomingEvents} from "./actions";
import {callError} from "../../components/Common/ErrorTools";


function* sGetUpcomingEvents({payload}) {
  try {
    const response = yield call(getUpcomingEvents,payload)
    yield put(setUpcomingEvents(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetActiveSeries({payload}) {
  try {
    const response = yield call(getActiveSeries,payload)
    yield put(setActiveSeries(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* dashboardSaga() {
  yield takeEvery(GET_UPCOMING_EVENTS, sGetUpcomingEvents)
  yield takeEvery(GET_ACTIVE_SERIES, sGetActiveSeries)
}

export default dashboardSaga

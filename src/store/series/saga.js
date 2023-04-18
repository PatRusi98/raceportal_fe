import { takeEvery, put, call } from "redux-saga/effects"


import {
  CREATE_CAR_CLASS,
  CREATE_SERIES, DELETE_CAR_CLASS,
  DELETE_SERIES,
  GET_ALL_SERIES,
  GET_SERIES_DETAIL, GET_STANDINGS, UPDATE_CAR_CLASS,
  UPDATE_SERIES, UPLOAD_SERIES_IMAGE
} from "./actionTypes"
import {
  setAllSeries,
  getAllSeries as rGetAllSeries,
  setSeriesDetail,
  getSeriesDetail as rGetSeriesDetail,
  setStandings
} from "./actions"
import {
  createCarClass,
  createSeries, deleteCarClass,
  deleteSeries,
  getAllSeries,
  getSeriesDetail, getStandings,
  updateCarClass,
  updateSeries, uploadSeriesImage
} from "../../helpers/backend_calls";
import {callError, callSuccess} from "../../components/Common/ErrorTools";



function* sGetAllSeries() {
  try {
    const response = yield call(getAllSeries)
    yield put(setAllSeries(response))

  } catch (error) {
    callError("Please try again later", "Error")
    console.log(error);
    //yield put(loginError(error.response.data))
  }
}

function* sCreateSeries({payload}) {
  try {
    const response = yield call(createSeries,payload)
    yield put(rGetAllSeries())
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sUpdateSeries({payload}) {
  try {
    const response = yield call(updateSeries,payload)
    yield put(setSeriesDetail(response))
    yield put(rGetAllSeries())
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sUploadSeriesImage({payload}) {
  try {
    const response = yield call(uploadSeriesImage,payload)
    yield put(setSeriesDetail(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sDeleteSeries({payload}) {
  try {
    const response = yield call(deleteSeries,payload)
    yield put(rGetAllSeries())
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetSeriesDetail({payload}) {
  try {

    const response = yield call(getSeriesDetail,payload)
    yield put(setSeriesDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetStandings({payload}) {
  try {

    const response = yield call(getStandings,payload)
    yield put(setStandings(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sCreateCarClass({payload}) {
  try {
    const response = yield call(createCarClass,payload)
    yield put(rGetSeriesDetail({id:payload.seriesId}))
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sUpdateCarClass({payload}) {
  try {
    const response = yield call(updateCarClass,payload)
    yield put(rGetSeriesDetail({id:payload.seriesId}))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sDeleteCarClass({payload}) {
  try {
    const response = yield call(deleteCarClass,payload)
    yield put(rGetSeriesDetail({id:payload.seriesId}))
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* seriesSaga() {
  yield takeEvery(GET_ALL_SERIES, sGetAllSeries)
  yield takeEvery(GET_STANDINGS, sGetStandings)
  yield takeEvery(CREATE_SERIES, sCreateSeries)
  yield takeEvery(UPDATE_SERIES, sUpdateSeries)
  yield takeEvery(DELETE_SERIES, sDeleteSeries)
  yield takeEvery(GET_SERIES_DETAIL, sGetSeriesDetail)
  yield takeEvery(CREATE_CAR_CLASS, sCreateCarClass)
  yield takeEvery(UPDATE_CAR_CLASS, sUpdateCarClass)
  yield takeEvery(DELETE_CAR_CLASS, sDeleteCarClass)
  yield takeEvery(UPLOAD_SERIES_IMAGE, sUploadSeriesImage)
}

export default seriesSaga

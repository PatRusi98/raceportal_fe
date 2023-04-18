import { takeEvery, put, call } from "redux-saga/effects"



import {
  createLicense, deleteLicense, getAllLicense, getLicenseDetail, updateLicense
} from "../../helpers/backend_calls";
import {getAllLicenses, setAllLicenses, setLicenseDetail} from "./actions";
import {CREATE_LICENSE, DELETE_LICENSE, GET_ALL_LICENSES, GET_LICENSE_DETAIL, UPDATE_LICENSE} from "./actionTypes";
import {callError, callSuccess} from "../../components/Common/ErrorTools";



function* sCreateLicense({payload}) {
  try {
    const response = yield call(createLicense,payload.data)
    payload.history.push("/settings/licenses")
    //yield put(setLicenseDetail(response))
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sUpdateLicense({payload}) {
  try {
    const response = yield call(updateLicense,payload.data)
    payload.history.push("/settings/licenses")
    //yield put(setLicenseDetail(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sDeleteLicense({payload}) {
  try {
    const response = yield call(deleteLicense,payload)
    yield put(getAllLicenses())
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetAllLicenses({payload}) {
  try {
    const response = yield call(getAllLicense,payload)
    yield put(setAllLicenses(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sGetLicenseDetail({payload}) {
  try {
    const response = yield call(getLicenseDetail,payload)
    yield put(setLicenseDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* licenseSaga() {
  yield takeEvery(GET_ALL_LICENSES, sGetAllLicenses)
  yield takeEvery(GET_LICENSE_DETAIL, sGetLicenseDetail)
  yield takeEvery(CREATE_LICENSE, sCreateLicense)
  yield takeEvery(UPDATE_LICENSE, sUpdateLicense)
  yield takeEvery(DELETE_LICENSE, sDeleteLicense)
}

export default licenseSaga

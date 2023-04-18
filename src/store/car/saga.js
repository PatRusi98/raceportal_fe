import { takeEvery, put, call } from "redux-saga/effects"


import {CREATE_CAR, DELETE_CAR, GET_ALL_CAR, GET_ALL_CARS, GET_CAR_DETAIL, UPDATE_CAR} from "./actionTypes"
import {setAllCars, getAllCars as rGetAllCars, setCarDetail} from "./actions"
import {createCar, deleteCar, getAllCars, getCarDetail, updateCar} from "../../helpers/backend_calls";
import {callError, callSuccess} from "../../components/Common/ErrorTools";



function* sGetAllCars() {
  try {
    const response = yield call(getAllCars)
    yield put(setAllCars(response))

  } catch (error) {
    callError("Please try again later", "Error")

    //yield put(loginError(error.response.data))
  }
}

function* sCreateCar({payload}) {
  try {
    const response = yield call(createCar,payload)
    yield put(rGetAllCars())
    callSuccess("Record was created", "Created")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sUpdateCar({payload}) {
  try {
    const response = yield call(updateCar,payload)
    //yield put(setCarDetail(response))
    yield put(rGetAllCars())
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sDeleteCar({payload}) {
  try {
    const response = yield call(deleteCar,payload)
    yield put(rGetAllCars())
    callSuccess("Record was deleted", "Deleted")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sGetCarDetail({payload}) {
  try {
    const response = yield call(getCarDetail,payload)
    yield put(setCarDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* carSaga() {
  yield takeEvery(GET_ALL_CARS, sGetAllCars)
  yield takeEvery(CREATE_CAR, sCreateCar)
  yield takeEvery(UPDATE_CAR, sUpdateCar)
  yield takeEvery(DELETE_CAR, sDeleteCar)
  yield takeEvery(GET_CAR_DETAIL, sGetCarDetail)
}

export default carSaga

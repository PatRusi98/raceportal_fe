import { takeEvery, put, call } from "redux-saga/effects"



import {
  addLicenseToUser,
  getAllUsers, getUserDetail, removeLicenseFromUser
} from "../../helpers/backend_calls";
import {setAllUsers, setUserDetail} from "./actions";
import {
  ADD_LICENSE_TO_USER,
  GET_ALL_USERS, GET_USER_DETAIL, REMOVE_LICENSE_FROM_USER,
} from "./actionTypes";
import {callError} from "../../components/Common/ErrorTools";



function* sGetAllUsers({payload}) {
  try {
    const response = yield call(getAllUsers,payload)
    yield put(setAllUsers(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sGetUserDetail({payload}) {
  try {
    const response = yield call(getUserDetail,payload)
    yield put(setUserDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sAddLicenseToUser({payload}) {
  try {
    const response = yield call(addLicenseToUser,payload)
    yield put(setUserDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}
function* sRemoveLicenseFromUser({payload}) {
  try {
    const response = yield call(removeLicenseFromUser,payload)
    yield put(setUserDetail(response))

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* userSaga() {
  yield takeEvery(GET_ALL_USERS, sGetAllUsers)
  yield takeEvery(GET_USER_DETAIL, sGetUserDetail)
  yield takeEvery(ADD_LICENSE_TO_USER, sAddLicenseToUser)
  yield takeEvery(REMOVE_LICENSE_FROM_USER, sRemoveLicenseFromUser)
}

export default userSaga

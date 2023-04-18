import { takeEvery, put, call } from "redux-saga/effects"


import {EDIT_USER, LOGIN, REGISTER, UPLOAD_AVATAR} from "./actionTypes"
import {loginError, setUser} from "./actions"
import {editUser, login, register, uploadAvatar} from "../../helpers/backend_calls";
import {callError, callSuccess} from "../../components/Common/ErrorTools";




function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, {
      username: user.username,
      password: user.password
    })
    console.log(response);
    localStorage.setItem("token", response.token)
    localStorage.setItem("expiration", response.expiration)
    localStorage.setItem("refreshToken", response.refreshToken)
    localStorage.setItem("expirationRefresh", response.expirationRefresh)
    yield put(setUser(response.user))
    history.push("/dashboard")

  } catch (error) {
    yield put(loginError(error.response.data))
  }
}

function* registerUser({ payload: { user, history } }) {
  try {
    const response = yield call(register, user)
    //console.log(response)
    history.push("/login")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sEditUser({ payload: { user} }) {
  try {
    const response = yield call(editUser, user)
    yield put(setUser(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}

function* sUploadAvatar({ payload }) {
  try {
    const response = yield call(uploadAvatar, payload)
    yield put(setUser(response))
    callSuccess("Record was updated", "Updated")

  } catch (error) {
    callError("Please try again later", "Error")
    //yield put(loginError(error.response.data))
  }
}


function* authSaga() {
  yield takeEvery(LOGIN, loginUser)
  yield takeEvery(REGISTER, registerUser)
  yield takeEvery(EDIT_USER, sEditUser)
  yield takeEvery(UPLOAD_AVATAR, sUploadAvatar)
}

export default authSaga

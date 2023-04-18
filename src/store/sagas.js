import { all, fork } from "redux-saga/effects"
import authSaga from "./auth/saga";
import seriesSaga from "./series/saga";
import scoringSaga from "./scoring/saga";
import carSaga from "./car/saga";
import eventSaga from "./event/saga";
import licenseSaga from "./license/saga";
import userSaga from "./user/saga";
import dashboardSaga from "./dashboard/saga";
import entrySaga from "./entry/saga";



export default function* rootSaga() {
  yield all([
      fork(authSaga),
      fork(seriesSaga),
      fork(scoringSaga),
      fork(carSaga),
      fork(eventSaga),
      fork(licenseSaga),
      fork(userSaga),
      fork(dashboardSaga),
      fork(entrySaga)
  ])
}

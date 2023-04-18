import {
  CREATE_CAR, DELETE_CAR,
  GET_ALL_CARS, GET_CAR_DETAIL, SET_ALL_CARS, SET_CAR_DETAIL, UPDATE_CAR

} from "./actionTypes"

export const getAllCars = (payload) => {
  return {
    type: GET_ALL_CARS,
    payload: payload,
  }
}

export const setAllCars = (payload) => {
  return {
    type: SET_ALL_CARS,
    payload: payload,
  }
}

export const getCarDetail = (payload) => {
  return {
    type: GET_CAR_DETAIL,
    payload: payload,
  }
}

export const setCarDetail = (payload) => {
  return {
    type: SET_CAR_DETAIL,
    payload: payload,
  }
}
export const createCar = (payload) => {
  return {
    type: CREATE_CAR,
    payload: payload,
  }
}
export const updateCar = (payload) => {
  return {
    type: UPDATE_CAR,
    payload: payload,
  }
}
export const deleteCar = (payload) => {
  return {
    type: DELETE_CAR,
    payload: payload,
  }
}


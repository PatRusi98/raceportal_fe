import {del, get, post, postClear, postMultipart, put} from "./api_helper"
import * as url from "./url_helper"
import axios from "axios";
import {CAR_CLASS, EVENT} from "./url_helper";


const login = (data) => postClear(url.LOGIN, data)
const register = (data) => postClear(url.REGISTER, data)
const editUser = (user) => put(url.USER + "/" + user.id, user)
const getAllUsers = () => get(url.USER)
const getUserDetail = (user) => get(url.USER+ "/" + user.id)
const removeLicenseFromUser = (user) => put(url.USER+ "/" + user.id+"/remove-license/"+user.license)
const addLicenseToUser = (user) => put(url.USER+ "/" + user.id+"/add-license/"+user.license)
const uploadAvatar = ({user, formData}) => postMultipart(url.USER + "/avatar/" + user.id, formData)

const getAllSeries = () => get(url.SERIES)
const getSeriesEvents = (data) => get(url.SERIES + "/" + data.id + "/events")
const getSeriesDetail = (data) => get(url.SERIES + "/" + data.id)
const getStandings = (data) => get(url.SERIES + "/" + data.id+"/standings")
const getActiveSeries = (data) => get(url.SERIES + "/active")
const createSeries = (data) => post(url.SERIES, data)
const updateSeries = (data) => put(url.SERIES + "/" + data.id, data)
const deleteSeries = (data) => del(url.SERIES + "/" + data.id)
const uploadSeriesImage = ({series, formData}) => postMultipart(url.SERIES + "/image/" + series.id, formData)

const createCarClass = (data) => post(url.CAR_CLASS, data)
const updateCarClass = (data) => put(url.CAR_CLASS + "/" + data.id, data)
const deleteCarClass = (data) => del(url.CAR_CLASS + "/" + data.id)

const getAllScoring = () => get(url.SCORING)
const getScoringDetail = (data) => get(url.SCORING + "/" + data.id)
const createScoring = (data) => post(url.SCORING, data)
const updateScoring = (data) => put(url.SCORING + "/" + data.id, data)
const deleteScoring = (data) => del(url.SCORING + "/" + data.id)

const getAllCars = () => get(url.CARS)
const getCarDetail = (data) => get(url.CARS + "/" + data.id)
const createCar = (data) => post(url.CARS, data)
const updateCar = (data) => put(url.CARS + "/" + data.id, data)
const deleteCar = (data) => del(url.CARS + "/" + data.id)

const getAllEvents = () => get(url.EVENT)
const getUpcomingEvents = () => get(url.EVENT+"/upcoming")
const getEventDetail = (data) => get(url.EVENT + "/" + data.id)
const createEvent = (data) => post(url.EVENT, data)
const addResultPenalty = (data) => post(url.EVENT+"/result/"+data.eventId+"/penalty/"+data.sessionId+"/"+data.id, data)
const updateEvent = (data) => put(url.EVENT + "/" + data.id, data)
const deleteEvent = (data) => del(url.EVENT + "/" + data.id)
const uploadEventImage = ({event, formData}) => postMultipart(url.EVENT + "/image/" + event.id, formData)
const uploadResult = ({event, formData}) => postMultipart(url.EVENT + "/result/" + event.id, formData)
const getEventResults = (event) => get(url.EVENT + "/result/" + event.id)
const deleteEventResults = ({eventId,sessionId}) => del(url.EVENT + "/result/" + eventId+"/"+sessionId)

const getAllLicense = () => get(url.LICENSE)
const getLicenseDetail = (data) => get(url.LICENSE + "/" + data.id)
const createLicense = (data) => post(url.LICENSE, data)
const updateLicense = (data) => put(url.LICENSE + "/" + data.id, data)
const deleteLicense = (data) => del(url.LICENSE + "/" + data.id)

const registerEntry = ({series, formData}) => postMultipart(url.SERIES +"/"+  series.id+"/entry", formData)
const getEntries = (series) => get(url.SERIES +"/"+  series.id+"/entry")
const getEntriesExport = (series) => get(url.SERIES +"/"+  series.id+"/export/jlkbsd15fd55dcs151211z47we8")
const getEntriesEntryList = (series) => get(url.SERIES +"/"+  series.id+"/entry-list/jlkbsd15fd55dcs151211z47we8")
const getEntry = ({seriesId,id}) => get(url.SERIES +"/"+  seriesId+"/entry/"+id)
const approveEntry = ({series,id}) => put(url.SERIES +"/"+  series.id+"/entry/"+id+"/approve")
const updateEntry = ({series,data}) => put(url.SERIES +"/"+  series.id+"/entry/"+data.id,data)
const uploadEntryImage = ({series,entry, formData}) => postMultipart(url.SERIES +"/"+  series.id+ "/entry/image/" + entry.id, formData)


export {
    login,
    register,
    editUser,
    uploadAvatar,
    getAllUsers,
    getUserDetail,
    removeLicenseFromUser,
    addLicenseToUser,

    getAllSeries,
    getSeriesEvents,
    createSeries,
    updateSeries,
    deleteSeries,
    getSeriesDetail,
    uploadSeriesImage,
    getActiveSeries,
    getStandings,

    createCarClass,
    updateCarClass,
    deleteCarClass,

    getAllScoring,
    getScoringDetail,
    createScoring,
    updateScoring,
    deleteScoring,

    getAllCars,
    getCarDetail,
    createCar,
    updateCar,
    deleteCar,

    getAllEvents,
    getEventDetail,
    createEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
    getUpcomingEvents,
    uploadResult,
    getEventResults,deleteEventResults,addResultPenalty,

    getAllLicense,
    getLicenseDetail,
    createLicense,
    updateLicense,
    deleteLicense,

    registerEntry,
    getEntries,
    getEntry,
    updateEntry,
    uploadEntryImage,
    getEntriesExport,
    getEntriesEntryList,
    approveEntry
}
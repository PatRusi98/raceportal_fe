import axios from "axios"

//pass new generated access token here
const token = localStorage.getItem("accessToken")

//apply base url for axios
//
//export const API_URL = "http://localhost:8088/"
//export const API_URL = "https://dmsk.hrusovsky.net/"
export const API_URL = "http://localhost:8000/"
export const IMAGE_PROVIDER = "api/v1/images/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

function checkToken(){
  let exp = new Date(window.localStorage.getItem("expiration"));
  //exp = new Date();
  // if(exp <= new Date()){
  //   window.location="/logout";
  // }
}

export async function get(url, config = {}) {
  checkToken();
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  checkToken();
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}
export async function postClear(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return axiosApi
      .post(url, { ...data }, { ...config })
      .then(response => response.data)
}

export async function postMultipart(url, data, config = {headers: {"Content-Type": "multipart/form-data"}}) {
  checkToken();
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return axiosApi
      .post(url, data, config)
      .then(response => response.data)
}

export async function put(url, data, config = {}) {
  checkToken();
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  checkToken();
  axiosApi.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

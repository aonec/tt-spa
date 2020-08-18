import axios from "axios"
import { auth } from "./auth"

export const request = axios.create()
export const source = axios.CancelToken.source()
export const isCancel = (e) => axios.isCancel(e)


request.defaults.baseURL = "https://transparent-staging.herokuapp.com/api"

request.interceptors.request.use((req) => {
  req.headers["Authorization"] = createBearer()
  return req
})

request.interceptors.response.use(
  (res) => {
    if (res.data?.successResponse) {
      return Promise.resolve({ ...res.data.successResponse })
    }
    return res
  },
  (err) => {
    if (err.response?.status === 401) {
      return auth("refreshToken", { data: getTokenData() }).then(() =>
        request(err.config)
      )
    }
    return Promise.reject(err)
  }
)

function createBearer() {
  const token = JSON.parse(localStorage.getItem("token"))
  return `Bearer ${token}`
}

function getTokenData() {
  const token = JSON.parse(localStorage.getItem("token"))
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
  return { token, refreshToken }
}

import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

axios.defaults.baseURL = "https://transparent-staging.herokuapp.com/api"
axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.response.use(
  (res) => {
    if (res.config.url === "Auth/login") setTokenData(res)
    if (res.config.url === "Auth/refreshToken") setTokenData(res, true)
    return res
  },
  (err) => {
    if (err.response?.status === 401) return refresh(err.config)
    return Promise.reject(err)
  }
)

function getTokenData() {
  const token = JSON.parse(localStorage.getItem("token"))
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
  return { token, refreshToken }
}

function setTokenData({ data }, refresh = false) {
  const { token, refreshToken, roles } = data.successResponse
  localStorage.setItem("token", JSON.stringify(token))
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  !refresh && localStorage.setItem("roles", JSON.stringify(roles))
}

function refresh(config) {
  return axios
    .post("Auth/refreshToken", getTokenData())
    .then(() => axios(config))
}

export const useFetch = (config) => {
  const [data, setData] = React.useState({ loading: true })
  const { replace } = useHistory()

  useEffect(() => {
    axios(config).then(console.log)
  }, [config])

  return data
}

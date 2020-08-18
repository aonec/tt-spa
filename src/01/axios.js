import axios from "axios"

// const baseURL = process.env.REACT_APP_URL
const baseURL = "https://transparent-production.herokuapp.com/api"

axios.defaults.baseURL = baseURL

let cancel
axios.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ${takeFromLocStor("token")}`
  req.cancelToken = new axios.CancelToken((e) => {
    cancel = e
  })
  if (checkUrl("refresh", req.url)) {
    req.data = {
      token: takeFromLocStor("token"),
      refreshToken: takeFromLocStor("refreshToken"),
    }
  }
  return req
})


axios.interceptors.response.use(
  ({ data, config }) => {
    const url = config.url
    if (checkUrl("(login|refresh)", url)) {
      const token = data.successResponse.token
      const refreshToken = data.successResponse.refreshToken
      const roles = data.successResponse.roles
      saveToLocStor("token", token)
      saveToLocStor("refreshToken", refreshToken)
      checkUrl("login", url) && saveToLocStor("roles", roles)
    }

    if (checkUrl("(users/current)", url)) {
      const user = data.successResponse
      saveToLocStor("user", user)
    }
    const res = data.successResponse ?? data ?? {}
    return { ...res, url }
  },
  (error) => {
    console.log(error.message)
    const status = error?.response?.status
    if (status === 401 && !checkUrl("login", error.config.url)) {
      console.log("refresh")
      const config = error.config
      return new Promise((resolve, reject) => {
        axios.post("/auth/refreshToken").then(
          () => resolve(axios(config)),
          () => {
            localStorage.clear()
            window.location.replace("/login")
          }
        )
      })
    }
    return Promise.reject(error)
  }
)

export default axios
export { cancel }
//utils
function saveToLocStor(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function takeFromLocStor(name) {
  return JSON.parse(localStorage.getItem(name))
}

function checkUrl(str, url) {
  return new RegExp(str, "gi").test(url)
}

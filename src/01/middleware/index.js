import axios from "axios"
const sr = "successResponse"
const isAuth = (str = "") => str.match(/login/gi)

export function middleRequest(config) {
  if (isAuth(config.url)) return config
  const token = JSON.parse(localStorage.getItem("tokenData"))?.token ?? null
  config.headers["Authorization"] = `Bearer ${token}`
  return config
}

export function middleSuccess(response) {
  return response
}

export function middleError(error) {
  const { config, response } = error
  if (response?.status === 401) {
    return Promise.resolve(refresh(config))
  }

  return Promise.reject(error)
}

async function refresh(config) {
  const tokenData = JSON.parse(localStorage.getItem("tokenData"))
  try {
    const { data } = await axios.post("auth/refreshToken", tokenData)
    setTokenData(data, true)
    return axios(config)
  } catch (error) {
    localStorage.removeItem("tokenData")
    window.location.replace("/auth/login")
    return { auth: true, data: false }
  }
}

function setTokenData(data, refresh = false) {
  const { token, refreshToken, roles } = data[sr]
  localStorage.setItem("tokenData", JSON.stringify({ token, refreshToken }))
  !refresh && localStorage.setItem("roles", JSON.stringify(roles))
}

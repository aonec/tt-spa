import axios from "axios"

export const auth = axios.create({
  baseURL: "https://transparent-staging.herokuapp.com/api/Auth",
  method: "post",
})

auth.interceptors.request.use((req) => {
  if (req.url === "refreshToken") {
    console.log("start refresh")
  }
  return req
})

auth.interceptors.response.use((res) => {
  if (res.config.url === "login" || res.config.url === "refreshToken") {
    const { token, refreshToken, roles } = res.data.successResponse
    localStorage.setItem("token", JSON.stringify(token))
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
    localStorage.setItem("roles", JSON.stringify(roles))
  }
  if (res.config.url === "refreshToken") {
    sessionStorage.setItem("refresh", false)
    console.log("success refresh")
  }
  return res
})

import React from "react"
import axios from "axios"
import { middleError, middleSuccess, middleRequest } from "01/middleware"

// const baseURL = process.env.REACT_APP_URL
const baseURL = "https://transparent-production.herokuapp.com/api"

axios.defaults.baseURL = baseURL

axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.request.use(middleRequest)

axios.interceptors.response.use(middleSuccess, middleError)

export default axios

// ++++++++++++++++ hook
export const useFetch = ({ config }, dispatch) => {
  const { key, ...rest } = config
  const { token, cancel } = axios.CancelToken.source()
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({ ...rest, cancelToken: token })
        if (res.auth) {
          dispatch({ type: "auth", payload: res.data })
        }
        dispatch({ type: "success", payload: res.data })
      } catch (err) {
        console.log("err", err)
        dispatch({ type: "error", payload: err })
      }
    }
    config && fetchData()
    // eslint-disable-next-line
  }, [config?.url ?? null])
  // eslint-disable-next-line
  React.useEffect(() => () => cancel(), [key])
}

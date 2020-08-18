import React, { useEffect } from "react"
import { useLocation, useRouteMatch } from "react-router-dom"
import axios from "services/ajax"

export default () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  const { search, pathname } = useLocation()
  const source = axios.CancelToken.source()

  useEffect(() => {
    search && getTasks()
    return () => search && source.cancel(search)
  }, [search])

  async function getTasks() {
    dispatch({ type: "fetch_start" })
    try {
      const res = await axios(pathname + search, { cancelToken: source.token })
      const { successResponse } = res.data
      dispatch({ type: "fetch_success", payload: successResponse })
    } catch (error) {
      if (axios.isCancel(error)) {
      }
    }
  }

  return state
}

function reducer(state, action) {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true }
    case "fetch_success":
      return { ...action.payload, loading: false }
    default:
      console.error(action.type)
      return state
  }
}

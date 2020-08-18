import React from "react"
import { useRouteMatch, useLocation } from "react-router-dom"
import axios from "01/axios"

import { useCurrentApart } from "./useCurrentApart"
import { useFilter } from "./useFiter"
import { useApartList } from "./useApartList"

export async function fetchApartments(config, token) {
  try {
    const res = await axios({
      ...config,
      cancelToken: token,
    })
    const data = res.data.successResponse
    const url = res.config.url
    if (/.*(apart).*\/\d+/gi.test(url)) {
      const ApartmentId = url.match(/(\d+)/gi)[0]
      // console.log()
      const meters = await axios("MeteringDevices", { params: { ApartmentId } })
      const dataM = meters.data.successResponse
      return { ...data, meters: dataM }
    }
    return data
  } catch (error) {}
}
// /api/MeteringDevices
function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    //
    case "apart_start":
      return { ...state, apart: { loading: true } }
    case "apart_finish":
      return { ...state, apart: payload }
    case "page_leave":
      return { ...state, [payload]: {} }
    //
    case "apart_id_start":
      return { ...state, apartId: { loading: true } }
    case "apart_id_finish":
      return { ...state, apartId: payload }
    //
    case "change_params":
      return { ...state, params: { ...state.params, ...payload } }
    case "filter":
      return { ...state, filter: payload }
    default:
      console.error("meters", type)
      return state
  }
}

const URL = "apartments"
const pageURL = (url = "") => url.replace(/meters/, URL)

export const useMetersPage = () => {
  const { path, isExact, url } = useRouteMatch()
  const apartId = useRouteMatch(path + "(\\d+)")

  const [state, dispatch] = React.useReducer(reducer, {
    apart: {},
    apartId: {},
    params: { City: "Нижнекамск", Street: "Мира", HousingStockNumber: "95" },
    filter: "",
  })

  const { params } = state

  // apart
  React.useEffect(() => {
    let mount = true
    const { token, cancel } = axios.CancelToken.source()
    const timer = setTimeout(() => {
      if (isExact && Object.values(params).every((i) => i)) {
        dispatch({ type: "apart_start" })
        fetchApartments({ url: pageURL(url), params }, token).then(
          (data) => mount && dispatch({ type: "apart_finish", payload: data })
        )
      }
    }, 300)
    return () => {
      clearTimeout(timer)
      cancel()
      mount = false
    }
  }, [isExact, url, params])

  //  apart id
  const apartIdUrl = apartId?.url ?? null
  React.useEffect(() => {
    let mount = true
    const { token, cancel } = axios.CancelToken.source()
    if (apartIdUrl) {
      dispatch({ type: "apart_id_start" })
      fetchApartments({ url: pageURL(apartIdUrl) }, token).then(
        (data) => mount && dispatch({ type: "apart_id_finish", payload: data })
      )
    }
    return () => {
      mount = false
      cancel()
    }
  }, [apartIdUrl])

  const filter = useFilter(state, dispatch)
  const apartList = useApartList(state)
  const currentApart = useCurrentApart(state)

  return {
    aparts: { path },
    apartId,
    filter,
    apartList,
    currentApart,
  }
}

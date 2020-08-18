import React, { useReducer, useEffect } from "react"
import { Route, useLocation, useRouteMatch, Switch } from "react-router-dom"

import axios from "services/ajax"
import { Grid } from "components"
import { HousingStocksContext } from "./context"
import { Headers } from "./Headers"
import { Tabs } from "./Tabs"
import { HousingStocksList } from "./HousingStocksList"
import { HousingStocksObjectInfo } from "./HousingStocksObjectInfo"

export const HousingStoks = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const [state, dispatch] = useReducer(reducer, { config: null })
  const { config, page } = state
  useEffect(() => {
    config && fetchData()
  }, [config])

  async function fetchData() {
    try {
      const result = await axios(config)
      const { successResponse } = result.data
      dispatch({ type: "fetch_success", payload: { [page]: successResponse } })
    } catch (error) {}
  }

  return (
    <HousingStocksContext.Provider value={[state, dispatch]}>
      <Headers />
      <Switch>
        <Route
          path={path + ":obj_id/devices/:device_id"}
          render={() => "dev"}
        />
        <Route path={path + ":obj_id"} render={() => "object"} />
        <Route path={path} component={HousingStocksList} />
      </Switch>
    </HousingStocksContext.Provider>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case "fetch_success":
      return { ...state, ...action.payload, config: null }
    case "get":
      const { page, ...config } = action.payload
      return { ...state, config: { method: "get", ...config }, page }
    case "clear":
      return { ...state, [action.payload]: null }
    default:
      console.error(action.type)
      return state
  }
}

import React from "react"
import { Route } from "react-router-dom"

export const CurrentUser = (props) => {
  return <Route path={`/(\\w+)/users/(\\d+)`}>CurrentUser</Route>
}

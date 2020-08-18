import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

export const TaskPage = (props) => {
  const { path } = props.match
  return (
    <Switch>
      {/* <Route path={`${path}(executing|observing|archived)`} component={Tasks} />
      <Route path={`${path}(\\d+)/`} render={() => "tasks id"} />
      <Redirect from={path} to={path + "executing"} exact />
      <Redirect to="error" /> */}
    </Switch>
  )
}

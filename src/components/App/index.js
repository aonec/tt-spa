import React from "react"
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  useRouteMatch,
} from "react-router-dom"

import { GlobalStore } from "store"
import { Layout } from "components"
import {
  Login,
  TaskId,
  Objects,
  Dev,
  ObjectId,
  DeviceId,
  HousingStoks,
  Tasks,
} from "pages"

import { Menu } from "components/Menu"

export const App = () => {
  return (
    <GlobalStore>
      <Switch>
        <Route path="/login/" component={Login} />
        <Route path="/404/" render={() => "404"} />
        <Route path="/dev/" render={() => <Dev />} />
        <Route path="/">
          <Layout>
            <Switch>
              {/* <Route path="/tasks/:taskId" component={TaskId} />
              <Route path="/tasks/" component={Tasks} />
              <Route
                path="/housingstocks/"
                render={({ match: { path } }) => (
                  <Switch>
                    <Route
                      path={path + ":obj_id/devices/:device_id/"}
                      component={DeviceId}
                    />
                    <Route path={path + ":obj_id/"} component={ObjectId} />
                    <Route path={path} component={Objects} />
                  </Switch>
                )}
              />
              <Route path="/settings/" render={() => "settings"} />
              <Route path="/owners/" render={() => "settings"} />
              <Redirect from="*" to="/404" /> */}
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </GlobalStore>
  )
}

import React from "react"
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom"
import styled from "reshadow/macro"
import { tabs } from "styles/helper"
import { Tab } from "components"

const objPath = "/housingstocks/:housingstockId/"
const devicePath = objPath + "devices/:deviceId/"
export const Tabs = () => {
  const objMatch = useRouteMatch(objPath)
  const deviceMatch = useRouteMatch(devicePath)

  return styled(tabs)(
    <Switch>
      <Route path={devicePath}>
        <tabs>
          <Tab to={deviceMatch?.url} exact>
            Общие данные
          </Tab>
          <Tab to={deviceMatch?.url + "/hello"}>История показаний</Tab>
        </tabs>
      </Route>
      <Route path={[objPath, objPath + "devices/"]}>
        <tabs>
          <Tab to={objMatch?.url} exact>
            Общие данные
          </Tab>
          <Tab to={objMatch?.url + "/devices"}>ОДПУ</Tab>
        </tabs>
      </Route>
    </Switch>
  )
}

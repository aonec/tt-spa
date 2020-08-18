import React, { useContext } from "react"
import { Route, useRouteMatch, Switch } from "react-router-dom"
import styled from "reshadow/macro"

import { title_page } from "styles/helper"
import { HousingStocksContext } from "./context"

export const Headers = () => {
  const [state] = useContext(HousingStocksContext)
  const { path } = useRouteMatch()
  const { street, number } = state

  return styled(title_page)(
    <Switch>
      <Route path={path + ":id/devices/:id"}>devices</Route>
      <Route path={[path + ":id/devices", path + ":id/"]} exact>
        <title_page>{street && `${street}, ${number}`}</title_page>
      </Route>
      <Route path={path}>
        <title_page>Объекты</title_page>
      </Route>
    </Switch>
  )
}

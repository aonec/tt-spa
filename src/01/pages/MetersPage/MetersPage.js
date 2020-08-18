import React from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { HeaderBlock } from "01/components/HeaderBlock"
import { TabsBlock } from "01/components/TabsBlock"
import { useMetersPage } from "./useMetersPage"
import { Filter } from "./Filter"
import { MeterDataList } from "./MeterDataList"

import { CurrentApartment } from "./CurrentApartment"
import { ApartList } from "./ApartList"
export const MetersPage = () => {
  const { url, path } = useRouteMatch()
  const { filter, apartList, currentApart, aparts, apartId } = useMetersPage()

  return (
    <>
      <HeaderBlock title="Ввод показаний" />
      {/* <TabsBlock /> */}
      <Switch>
        <Route path="/meters/" exact>
          <Filter {...filter} />
          <ApartList {...apartList} />
        </Route>
        <Route path="/meters/(\d+)" exact>
          <CurrentApartment {...currentApart} />
          <MeterDataList />
        </Route>
      </Switch>
    </>
  )
}

import React from "react"
import { useRouteMatch, Route, Link } from "react-router-dom"
import styled from "reshadow/macro"

import { HeaderBlock } from "01/components/HeaderBlock"
import { TabsBlock } from "01/components/TabsBlock"
import { page } from "01/r_comp"
import { Tab } from "01/components/Tab"
import { useObjectId } from "./useObjectId"
import { Information } from "./Information"

export const ObjectId = ({ styles }) => {
  const { url, tabList, header = {} } = useObjectId()

  return styled(page)`
    div {
      grid-column: 1;
    }
  `(
    <>
      <HeaderBlock {...header} />
      <TabsBlock />
      <Information path={url} />
      <Route path={url + "/apartments"}>hello1</Route>
      <Route path={url + "/devices"}>hello3</Route>
    </>
  )
}

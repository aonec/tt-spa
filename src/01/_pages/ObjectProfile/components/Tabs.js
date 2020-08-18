import React from "react"
import styled from "reshadow/macro"
import { NavLink, useRouteMatch } from "react-router-dom"

import { tabs } from "01/r_comp"

export const Tabs = () => {
  const { url } = useRouteMatch("/:page/:id")
  const tabItems = [
    ["Общая информация", url],
    ["Квартиры", url + "/apartments"],
    ["ОДПУ", url + "/devices"],
  ].map((t, i) => (
    <NavLink
      to={t[1]}
      key={t[1]}
      activeClassName={tabs.active}
      replace
      exact={i === 0}
    >
      {t[0]}
    </NavLink>
  ))

  return styled(tabs)(<tabs>{tabItems}</tabs>)
}

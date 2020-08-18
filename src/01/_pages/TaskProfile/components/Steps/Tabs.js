import React from "react"
import styled from "reshadow/macro"
import { NavLink, useLocation, useRouteMatch } from "react-router-dom"

import { tabs } from "01/r_comp"

const tabItems = [
  "Шаг 1. Общие данные",
  "Шаг 2. Настойка соединения",
  "Шаг 3. Документ",
]

export const Tabs = ({ url }) => {
  console.log(url)
  return styled(tabs)`
    tabs {
      grid-column: 1 / -1;
    }
  `(
    <tabs>
      {tabItems.map((tab, i) => (
        <NavLink
          key={tab}
          to={`${url}/step${i + 1}`}
          activeClassName={tabs.active}
        >
          {tab}
        </NavLink>
      ))}
    </tabs>
  )
}

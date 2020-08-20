import React from 'react'
import styled from 'reshadow/macro'
import { NavLink, useRouteMatch } from 'react-router-dom'

import { tabs } from '01/r_comp'

const tabItems = [
  ['Общая информация', ''],
  ['История показаний', 'testimony'],
  ['Документы', 'documents'],
  ['История изменений', 'changes'],
]

export const Tabs = React.memo(() => {
  const { url } = useRouteMatch('/*/*/devices/(\\d+)/')
  console.log(url)
  return styled(tabs)(
    <tabs>
      {tabItems.map((t) => (
        <NavLink
          key={t[0]}
          to={t[1] ? `${url}/${t[1]}` : url}
          activeClassName={tabs.active}
          replace
          exact={!t[1]}
        >
          {t[0]}
        </NavLink>
      ))}
    </tabs>
  )
})

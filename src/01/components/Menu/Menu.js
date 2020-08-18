import React from "react"
import { NavLink } from "react-router-dom"
import styled from "reshadow/macro"

import { menu as style } from "01/styles/menu"
import { Icon } from "01/components/Icon"
import { useMenu } from "./useMenu"

export const Menu = () => {
  const menuList = useMenu()
  return styled(style)(
    <nav>
      {menuList.map(({ name, to, icon, company }, i) => (
        <NavLink key={i} to={to} activeClassName={style.active}>
          {icon && <Icon icon={icon} />}
          <span>{name}</span>
          {company && <span>{company}</span>}
        </NavLink>
      ))}
    </nav>
  )
}

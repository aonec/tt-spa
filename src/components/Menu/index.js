import React from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { task, object, key, setting, username2 } from "assets/icons/menu.json"

const menuItems = [
  {
    name: "Задачи",
    icon: task,
    to: "/tasks",
  },
  { name: "Объекты", icon: object, to: "/housingstocks/" },
  { name: "Собственники", icon: key, to: "/owners/" },
  { name: "Настройки", icon: setting, to: "/settings/" },
]

export const Menu = ({ styles }) => {
  return styled(styles)(
    <nav>
      <menu as="ul">
        <li>
          <NavLink to="/user">
            <svg width={16} height={16} fill="currentColor">
              <path as="path" d={username2} />
            </svg>
            username@yandex.ru
            <span>УК "Лесные озёра"</span>
          </NavLink>
          <logout as="a" href="/login">
            <span>Выход</span>
          </logout>
        </li>
        {menuItems.map(({ name, icon, to }) => (
          <li key={name}>
            <NavLink to={to} activeClassName={styles.active}>
              <svg width={16} height={16} fill="currentColor">
                <path as="path" d={icon} />
              </svg>
              {name}
            </NavLink>
          </li>
        ))}
      </menu>
    </nav>
  )
}

Menu.defaultProps = {
  styles: css`
    menu {
      --active: rgb(var(--primary));
      display: grid;
      grid-gap: 16px;
    }

    NavLink,
    logout {
      cursor: pointer;
      display: grid;
      grid-template-columns: 16px auto;
      grid-gap: 8px;
      align-items: center;
      padding: 8px 0;
      padding-left: 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      & > span {
        grid-column: 2;
        font-size: 12px;
      }
      &:hover {
        color: var(--active);
      }
    }

    NavLink {
      position: relative;

      & > span {
        color: rgba(var(--main), 0.6);
        font-weight: normal;
      }
      &::before {
        content: "";
        position: absolute;
        display: block;
        height: 100%;
        width: 2px;
        border-radius: 0 4px 4px 0;
      }
    }

    .active {
      color: var(--active);
      &::before {
        background: var(--active);
      }
    }
  `,
}

import React from "react"
import { NavLink, useLocation, Redirect } from "react-router-dom"
import styled, { css } from "reshadow/macro"
import t from "prop-types"

export const Tabs = ({ styles, items = [] }) => {
  const { hash, pathname } = useLocation()
  if (!hash) {
    return <Redirect to={{ pathname, hash: items[0].tab }} />
  }
  if (!items.some((item) => hash === "#" + item.tab)) {
    return <Redirect to="/404" />
  }
  return styled(styles)(
    <tabs>
      {items.map(({ name, tab, total }) => (
        <NavLink
          key={tab || name}
          to={{ pathname, hash: tab }}
          isActive={() => hash === "#" + tab}
          activeClassName={styles.active}
          replace
        >
          {name} {total && `(${total})`}
        </NavLink>
      ))}
    </tabs>
  )
}

Tabs.propTypes = {
  items: t.arrayOf(
    t.shape({
      name: t.string.isRequired,
      tab: t.string.isRequired,
    })
  ).isRequired,
}

Tabs.defaultProps = {
  styles: css`
    tabs {
      border-bottom: 1px solid rgb(var(--frame));
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      grid-gap: 16px;
      color: rgb(var(--main));
      font-weight: 600;
      font-size: 16px;
      line-height: 2em;
    }

    NavLink {
      padding: 8px;
      position: relative;
      &:hover {
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 2px;
        background-color: transparent;
      }

      &:hover,
      &.active {
        color: rgb(var(--primary));
      }

      &.active::before {
        background-color: rgb(var(--primary));
      }
    }
  `,
}

import React from "react"
import { Route, NavLink, Redirect, Switch } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const TabsRoute = ({ styles, tabs, name, path }) => {
  return (
    <Switch>
      <Route
        path={`${path}:${name}`}
        render={({ match }) => {
          if (!tabs.some((item) => item.to === match.params[name])) {
            return <Redirect to="/404" />
          }
          return styled(styles)(
            <tabs>
              {tabs.map(({ to, name }) => (
                <NavLink
                  key={to}
                  to={path + to}
                  activeClassName={styles.active}
                  replace
                >
                  {name}
                </NavLink>
              ))}
            </tabs>
          )
        }}
      />
      <Redirect to={path + tabs[0].to} />
    </Switch>
  )
}

TabsRoute.defaultProps = {
  styles: css`
    tabs {
      color: rgb(var(--main));
      border-bottom: 1px solid rgb(var(--frame));
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, auto));
      justify-content: start;
      grid-gap: 16px;
      font-weight: 600;
      font-size: 16px;
      line-height: 2em;
    }
    NavLink {
      padding: 8px;
      position: relative;

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

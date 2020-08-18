import React from "react"
import { Route, useRouteMatch } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const Information = ({
  styles,
  list = [],
  title = "Информация",
  path = "",
}) => {
  const match = useRouteMatch()
  if (!list) return "loading"
  return styled(styles)(
    <Route path={path} exact>
      <div>
        <h2>{title}</h2>
        <ul>
          {list.map((item) => (
            <div>helo</div>
          ))}
        </ul>
      </div>
    </Route>
  )
}

Information.defaultProps = {
  styles: css`
    div {
      border: 1px solid red;
    }
  `,
}

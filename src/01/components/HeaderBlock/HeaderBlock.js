import React from "react"
import { Route, useHistory, useRouteMatch } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon } from "01/components/Icon"
import { button } from "01/r_comp"

const hb = css`
  hb {
    grid-column: 1 / -1;
    display: grid;
    grid-template-rows: 48px repeat(auto-fit, minmax(16px auto));
    grid-gap: 8px;
    align-items: center;
  }
  title {
    grid-row: 1;
    grid-column: 1;
  }
  city {
    color: var(--main-60);
  }
`

export const HeaderBlock = ({
  title = "",
  loader = false,
  city = "",
  ...props
}) => {
  const { push } = useHistory()
  const { url } = useRouteMatch()
  return styled(hb)(
    <hb {...props}>
      {loader && "loader"}
      <Route path="/object/(\\d+)">
        <title as="h1">{title}</title>
        <city>{city}</city>
      </Route>
      <Route path="/(tasks|objects|meters|settings)/">
        <title as="h1">{title}</title>
        <Route path={`/settings/(users|c.{1,})`}>
          <ButtonLink onClick={() => push(url + "/create")} />
        </Route>
      </Route>
      {/* object id */}
      <Route></Route>
      <Route></Route>
      <Route></Route>
    </hb>
  )
}
const ButtonLink = (props) =>
  styled(button)`
    button {
      padding: 0;
      height: 48px;
      width: 48px;
      grid-column: 2;
      grid-row: 1;
      justify-self: end;
    }
  `(
    <button {...props}>
      <span>
        <Icon icon="plus" size={24} />
      </span>
    </button>
  )

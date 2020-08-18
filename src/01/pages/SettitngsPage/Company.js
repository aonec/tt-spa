import React from "react"
import styled from "reshadow/macro"
import { Route, useRouteMatch } from "react-router-dom"
import t from "prop-types"

import { input } from "01/r_comp"

export const Company = ({
  id = null,
  information = null,
  name = "",
  phoneNumber = "",
  timeZoneOffset = "",
}) => {
  const { path } = useRouteMatch()
  // console.log(props)
  return styled(input)`
    label {
      grid-column: 1;
      max-width: 480px;
      display: grid;
      grid-gap: 8px;
      color: var(--main-60);
    }
  `(
    <Route path={path} exact>
      <>
        <label>
          Название компании
          <input_frame data-big>
            <input readOnly defaultValue={name} />
          </input_frame>
        </label>
        <label>
          Телефон
          <input_frame data-big>
            <input readOnly defaultValue={phoneNumber ?? "--- -- --"} />
          </input_frame>
        </label>
        <label>
          Часовой пояс
          <input_frame data-big>
            <input readOnly defaultValue={timeZoneOffset} />
          </input_frame>
        </label>
      </>
    </Route>
  )
}

Company.propTypes = {
  id: t.number,
  information: t.oneOf([null]),
  name: t.string,
  phoneNumber: t.string,
  timeZoneOffset: t.string,
}

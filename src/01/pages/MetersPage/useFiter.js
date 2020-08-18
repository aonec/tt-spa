import React from "react"
import styled from "reshadow/macro"

import { input } from "01/r_comp"

const ph = "placeholder",
  fields = [
    { name: "City", [ph]: "Город" },
    { name: "Street", [ph]: "Улица" },
    { name: "HousingStockNumber", [ph]: "Дом" },
    { name: "filter", [ph]: "Кв" },
  ]

export const useFilter = ({ params = {}, filter = "" }, dispatch) => {
  const change = (e) => {
    const value = e.target.value
    const name = e.target.name
    if (name === "filter") {
      dispatch({ type: "filter", payload: value })
    } else {
      dispatch({ type: "change_params", payload: { [name]: value } })
    }
  }

  return {
    inputs: fields.map(({ name, ...rest }) =>
      styled(input)`
        input_frame input {
          text-transform: capitalize;
        }
      `(
        <input_frame key={name}>
          <input
            name={name}
            {...rest}
            value={name === "filter" ? filter : params[name]}
            onChange={change}
          />
        </input_frame>
      )
    ),
  }
}

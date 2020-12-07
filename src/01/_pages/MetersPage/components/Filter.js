import React from "react"

import styled, { use } from "reshadow/macro"

import { input } from "01/r_comp"

export const Filter = ({ inputs = [] }) => {
  return styled(input)`
    filter {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(200px, 1fr)
        minmax(200px, 1fr)
        minmax(100px, 0.5fr)
        minmax(100px, 0.5fr);
      grid-gap: 16px;
    }
  `(
    <filter as="div">
      {inputs.map((input) => (
        <input_frame key={input.name}>
          <input {...input} />
        </input_frame>
      ))}
    </filter>
  )
}

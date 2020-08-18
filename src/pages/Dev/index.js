import React from "react"
import styled from "reshadow/macro"
// eslint-disable-next-line
import { Button, Icon, Input } from "components"

export const Dev = () => {
  return styled()`
    div {
      display: grid;
      padding: 10%;
      border: 1px solid blue;
      height: 100vh;
    }
  `(
    <div>
      <Input placeholder="test" />
    </div>
  )
}

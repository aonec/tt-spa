import React, { useState } from "react"
import styled, { css } from "reshadow/macro"
import { SelectExecutor } from "selects"
import { PushButton } from "./PushButton"

export const ChooseExecutor = ({ styles }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  return styled(styles)(
    <div>
      <SelectExecutor big getSelectData={(id) => setNextPerpetratorId(id)} />

      <PushButton disabled={!nextPerpetratorId} data={{ nextPerpetratorId }} />
    </div>
  )
}

ChooseExecutor.defaultProps = {
  styles: css`
    div {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 16px;
      align-items: end;
    }
  `,
}

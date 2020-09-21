import React, { useState } from "react"
import styled, { css } from "reshadow/macro"

import { SelectNextActions, SelectExecutor } from "selects"
import { PushButton } from "./PushButton"

export const ChooseExecutorAndSwitch = ({ styles }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  const [nextStageId, setNextStageId] = useState(null)

  return styled(styles)(
    <div>
      <SelectNextActions big getSelectData={(id) => setNextStageId(id)} />
      <SelectExecutor big getSelectData={(id) => setNextPerpetratorId(id)} />
      <PushButton
        disabled={!nextPerpetratorId || !nextStageId}
        data={{ nextPerpetratorId, nextStageId }}
      />
    </div>
  )
}

ChooseExecutorAndSwitch.defaultProps = {
  styles: css`
    div {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      align-items: end;
      grid-gap: 8px;
    }
  `,
}

import React, { useContext, useState } from "react"
import styled, { css } from "reshadow/macro"

import { Select } from "components"
import { label } from "styles/helper"
import { PushButton } from "./PushButton"
import { TaskIdContext } from "../contex"
import { SelectNextActions } from "selects"

export const Switch = ({ styles }) => {
  const [nextStageId, setNextStageId] = useState(null)
  const [{ options }] = useContext(TaskIdContext)

  return styled(styles, label)(
    <div>
      <SelectNextActions big getSelectData={(id) => setNextStageId(id)} />
      <PushButton disabled={!nextStageId} data={{ nextStageId }} />
    </div>
  )
}

Switch.defaultProps = {
  styles: css`
    div {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: end;
      grid-gap: 16px;
    }
  `,
}

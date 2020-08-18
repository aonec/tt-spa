import React, { useContext } from "react"

import styled, { css } from "reshadow/macro"

import { TaskIdContext } from "../contex"
import { ChooseExecutorAndNotify } from "./ChooseExecutorAndNotify"
import { UploadDocument } from "./UploadDocument"
import { Switch } from "./Switch"
import { PushButton } from "./PushButton"
import { Input, Label } from "components"
import { ChooseExecutorAndSwitch } from "./ChooseExecutorAndSwitch"
import { ChooseExecutor } from "./ChooseExecutor"

export const Panel = ({ styles }) => {
  const [{ currentStage, userOperatingStatus, perpetrator }] = useContext(
    TaskIdContext
  )

  if (!currentStage) return null
  if (userOperatingStatus === "Observer")
    return styled(styles)(
      <panel>
        <Label labelText="Исполнитель">
          <Input big readOnly defaultValue={perpetrator.name} />
        </Label>
      </panel>
    )
  const { action } = currentStage
  return styled(styles)(
    <panel>
      {action === "ChooseExecutorAndNotify" && <ChooseExecutorAndNotify />}
      {action === "UploadDocument" && <UploadDocument />}
      {action === "Switch" && <Switch />}
      {action === "ChooseExecutorAndSwitch" && <ChooseExecutorAndSwitch />}
      {action === "ChooseExecutor" && <ChooseExecutor />}
      {action === "Completion" && <PushButton disabled={false} />}
    </panel>
  )
}

Panel.defaultProps = {
  styles: css`
    panel {
      padding: 8px;
      display: grid;
      grid-gap: 16px;
      box-shadow: 0px 8px 16px rgba(78, 93, 146, 0.08),
        0px 4px 4px rgba(78, 93, 146, 0.16);
    }

    row {
      display: grid;
      grid-gap: 8px;
      align-items: end;
      &[|one] {
        grid-template-columns: 1fr 1fr;
      }

      &[|two] {
        grid-template-columns: 1fr auto;
      }
    }

    label {
      display: grid;
      font-size: 14px;
      font-weight: 500;
      color: rgba(var(--main), 0.6);
      grid-gap: 8px;
    }
  `,
}

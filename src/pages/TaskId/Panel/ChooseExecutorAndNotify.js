import React, { useState } from "react"
import styled, { css } from "reshadow/macro"

import { Button, Textarea } from "components"
import { SelectExecutor, SelectNotify } from "selects"
import { PushButton } from "./PushButton"

export const ChooseExecutorAndNotify = ({ styles }) => {
  const [nextPerpetratorId, setNextPerpetratorId] = useState(null)
  const [contractorsIds, setContractorsIds] = useState(null)
  const [message, setMessage] = useState("")
  return styled(styles)(
    <>
      <top>
        <SelectExecutor big getSelectData={(id) => setNextPerpetratorId(id)} />
        <SelectNotify big />
      </top>
      <bottom>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button big position="center">
          Выбрать шаблон
        </Button>
        <PushButton
          disabled={!nextPerpetratorId}
          data={{
            nextPerpetratorId,
            emailNotify: { message, contractorsIds },
          }}
        />
      </bottom>
    </>
  )
}

ChooseExecutorAndNotify.defaultProps = {
  styles: css`
    top,
    bottom {
      display: grid;
      grid-gap: 8px;
    }

    label {
      opacity: 0.6;
    }

    top {
      grid-template-columns: 1fr 1fr;
    }

    bottom {
      grid-template-columns: 1fr auto auto;
    }
  `,
}

import React from "react"

import { Button } from "components"
import { TaskIdContext } from "../contex"

export const PushButton = ({ disabled = true, data = {} }) => {
  const [state, dispatch] = React.useContext(TaskIdContext)
  const { loading } = state

  return (
    <Button
      big
      primary
      disabled={disabled}
      loading={loading.pushStage}
      onClick={() => dispatch({ type: "push_stage", payload: data })}
    >
      Завершить этап
    </Button>
  )
}

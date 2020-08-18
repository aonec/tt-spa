import React, { useState } from "react"
import styled from "reshadow/macro"

import { label } from "styles/helper"
import { Select } from "components"

export const SelectExecutor = (props) => {
  return styled(label)(
    <label>
      Исполнитель
      <Select big placeholder="Выберите исполнителя" {...props} />
    </label>
  )
}

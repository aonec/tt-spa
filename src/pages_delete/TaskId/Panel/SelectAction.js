import React, { useState } from "react"
import styled from "reshadow/macro"

import { label } from "styles/helper"
import { Select } from "components"

export const SelectAction = (props) => {
  return styled(label)(
    <label>
      Выберите дальнейшее действие
      <Select big placeholder="Выберите действие" {...props} />
    </label>
  )
}

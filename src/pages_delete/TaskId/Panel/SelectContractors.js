import React, { useState } from "react"
import styled from "reshadow/macro"

import { label } from "styles/helper"
import { Select } from "components"

export const SelectContractors = (props) => {
  return styled(label)(
    <label>
      Выберите получателя письма
      <Select big placeholder="Выберите исполнителя" {...props} />
    </label>
  )
}

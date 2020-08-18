import React from "react"
import styled, { css } from "reshadow/macro"
import * as s from "01/r_comp"

const styles = css``

export const UserInfo = ({ list = [] }) => {
  return styled(s.information)(
    <info_list>
      {list.map((item) => (
        <info_item key={item[0]}>
          <span>{item[0]}</span>
          <span>{item[1]}</span>
        </info_item>
      ))}
    </info_list>
  )
}

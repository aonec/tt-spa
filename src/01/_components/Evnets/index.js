import React from 'react'
import styled from 'reshadow//macro'

export const Events = ({ 0: title = '', 1: list = [] }) => {
  return styled()(
    <events>
      <e_title>{title}</e_title>
      <e_list>
        <e_item></e_item>
      </e_list>
    </events>
  )
}

import React from 'react'
import styled from 'reshadow/macro'

import { Loader } from '01/components/Loader'
import { information } from '01/r_comp'

export const Information = ({ list = [], loading = true, ...props }) => {
  return styled(information)`
    Loader {
      justify-self: center;
    }
  `(
    <information {...props}>
      <h2>Общая информация</h2>
      <Loader show={loading} size="32">
        <info_list>
          {list.map(({ title, value, url }) => (
            <info_item key={title}>
              <span>{title}</span>
              <span>{value}</span>
            </info_item>
          ))}
        </info_list>
      </Loader>
    </information>
  )
}

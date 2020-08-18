import React from "react"
import styled, { css, use } from "reshadow/macro"

import { userInfo, UserInfo } from "./UserInfo"
import { Icon } from "01/components"

const styles = css`
  drower {
    box-shadow: var(--shadow);
  }

  drower_btn {
    display: flex;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    & Icon {
      margin-right: 8px;
    }
  }

  drower_content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    padding: 0;
    overflow: hidden;
    height: 0;
    &[|show] {
      padding: 16px;
      height: auto;
    }
  }
`

export const ApartmentInfo = ({ userInfo = [], title }) => {
  const [show, setShow] = React.useState(false)
  return styled(styles)(
    <>
      <apart_title as="h2">{title}</apart_title>
      <drower>
        <drower_btn onClick={() => setShow(!show)}>
          <Icon icon="down" /> Информация о квартире
        </drower_btn>
        <drower_content {...use({ show })}>
          <UserInfo list={userInfo} />
        </drower_content>
      </drower>
    </>
  )
}

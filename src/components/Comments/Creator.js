import React from "react"
import styled, { css } from "reshadow/macro"

import { Avatar, Button, Textarea } from "components"

export const Creator = ({ styles, state, dispatch }) => {
  const { createValue, act } = state
  return styled(styles)(
    <creator>
      <Avatar />
      <Textarea
        value={createValue}
        onChange={(e) =>
          dispatch({ type: "change_create_value", payload: e.target.value })
        }
      />
      <Button
        primary
        disabled={!createValue}
        onClick={() => act !== "create" && dispatch({ type: "post_start" })}
      >
        Добавить комментарий
      </Button>
    </creator>
  )
}

Creator.defaultProps = {
  styles: css`
    creator {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 16px;

      & > :last-child {
        grid-column: 2;
        justify-self: start;
      }
    }
  `,
}

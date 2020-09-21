import React, { useContext } from "react"
import styled, { css } from "reshadow/macro"
import { Icon } from "components/Icon"
import { SelectContext } from "./context"

export const Field = ({ styles, children }) => {
  const { state, dispatch } = useContext(SelectContext)
  const { open } = state
  return styled(styles)(
    <field
      data-field
      tabIndex="-1"
      onClick={() => dispatch({ type: "open", payload: !open })}
      onFocus={(e) => e.stopPropagation()}
    >
      {children}
      <Icon icon="down" />
    </field>
  )
}

Field.defaultProps = {
  styles: css`
    field {
      outline: 0;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 8px;
      align-items: center;
      min-height: var(--height);
      padding: 0 var(--padding);
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      color: var(--color);
      background-color: var(--bg);
      transition: var(--transition);
      & > * {
        pointer-events: none;
      }
    }

    Icon {
      transform: rotate(var(--deg));
      transition: var(--transition);
    }
  `,
}

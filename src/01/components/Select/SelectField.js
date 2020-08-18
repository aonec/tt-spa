import React from "react"
import styled, { css, use } from "reshadow/macro"

import { Icon } from "01/components/Icon"

export const SelectField = ({
  styles,
  list = [],
  checkList = [],
  placeholder = "",
  show,
  setShow,
  ...props
}) => {
  const field = React.useRef()

  const checkedItem = list?.find((item) => item.id === checkList[0])

  const content = !checkList?.length
    ? styled()`
        ph {
          color: var(--main-32);
        }
      `(<ph>{placeholder}</ph>)
    : styled(styles)(
        <>
          {checkedItem.icon && <Icon icon={checkedItem.icon} />}
          {checkedItem.name}
        </>
      )

  return styled(styles)(
    <field
      {...props}
      ref={field}
      onClick={() => setShow(!show)}
      {...use({ show })}
    >
      <content>{content}</content>
      <Icon icon="down" />
    </field>
  )
}

SelectField.defaultProps = {
  styles: css`
    field {
      outline: 0;
      min-height: var(--h);
      border: 1px solid var(--frame);
      border-radius: 4px;
      padding: 8px var(--pdng);
      display: flex;
      & > Icon {
        align-self: center;
        margin-left: auto;
      }

      &[|show] {
        border-color: var(--active);
        & > Icon {
          transform: rotate(180deg);
        }
      }
    }

    content {
      padding: 0 8px;
      display: flex;
      align-items: center;
    }

    Icon {
      margin-right: 8px;
    }
  `,
}

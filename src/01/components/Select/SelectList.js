import React from "react"
import styled, { use, css } from "reshadow/macro"

import { Icon } from "01/components/Icon"
import { Loader } from "01/components"

export const SelectList = ({
  styles,
  onCheck = () => {},
  checkList = [],
  list = [],
  loading = true,
  show,
  setShow,
  ...props
}) => {
  const [focus, setFocus] = React.useState(-1)
  const selectList = React.useRef()

  if (loading)
    return styled(styles)`
      select_list {
        display: grid;
        place-content: center;
      }
      select_list[|show] {
        min-height: calc(1 * var(--h));
      }
    `(
      <select_list {...use({ show })} tabIndex="0" {...props}>
        <Loader show={loading} size="32" />
      </select_list>
    )

  const len = list?.length === 0 ? 1 : list.length

  const hendleKeyDown = (e) => {
    if (e.keyCode === 40) {
      setFocus(focus + 1 === len ? 0 : focus + 1)
    }
    if (e.keyCode === 38) {
      setFocus(focus - 1 < 0 ? len - 1 : focus - 1)
    }

    if (e.keyCode === 32) {
      addCheckedId(focus)
      selectList.current.blur()
    }
  }

  const addCheckedId = (index) => {
    const id = list[index].id
    onCheck([id])
  }

  const listProps = {
    tabIndex: 0,
    ref: selectList,
    onKeyDown: hendleKeyDown,
    ...props,
  }

  return styled(styles)`
    select_list[|show] {
      min-height: ${`calc(${len} * var(--h))`};
    }
  `(
    <select_list {...use({ show })} {...listProps}>
      {!list?.length && <empty>Нет данных</empty>}
      {list?.map(({ name, icon, id }, i) => (
        <select_item
          key={id ?? name}
          {...use({ focus: i === focus, checked: checkList.includes(id) })}
          onClick={() => {
            addCheckedId(i)
            setFocus(i)
            selectList.current.blur()
          }}
        >
          {icon && <Icon icon={icon} />}
          <span>{name}</span>
        </select_item>
      ))}
    </select_list>
  )
}

SelectList.defaultProps = {
  styles: css`
    select_list {
      outline: 0;
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: var(--shadow);
      padding: 0 var(--pdng);
      color: var(--main-80);
      height: 0;
      position: absolute;
      min-width: max-content;
      width: 100%;
      top: 100%;
      display: grid;
      z-index: 50;
    }

    empty {
      place-self: center;
    }

    select_item {
      height: var(--h);
      padding: 8px;
      border-bottom: 1px solid var(--frame);
      position: relative;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        left: -16px;
        right: -16px;
        bottom: 0;
        background-color: transparent;
      }
      &:hover,
      &[|focus],
      &[|checked] {
        color: #fff;
        &::before {
          background-color: var(--active);
        }
      }
    }

    span,
    Icon {
      position: relative;
      margin-left: 8px;
    }
  `,
}

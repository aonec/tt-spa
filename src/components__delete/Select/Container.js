import React, { useContext } from "react"
import styled, { css, use } from "reshadow/macro"
import { SelectContext } from "./context"

export const Container = ({ styles, children, ...props }) => {
  const { state, dispatch } = useContext(SelectContext)
  const { big, open, focus } = state

  const keyDown = (e) => {
    const ul = e.target.children[1]
    const h = ul.firstChild?.clientHeight ?? 0
    const limit = ul.children.length - 1

    if ([40, 38, 32].includes(e.keyCode)) e.preventDefault()
    e.keyCode === 40 && dispatch({ type: "key_down" })
    e.keyCode === 38 && dispatch({ type: "key_up" })
    e.keyCode === 32 && dispatch({ type: "key_check" })

    if (e.keyCode === 40 && focus !== null) {
      focus === limit ? ul.scrollTo(0, 0) : ul.scrollTo(0, (focus + 1) * h)
    }

    if (e.keyCode === 38) {
      focus === null
        ? ul.scrollTo(0, limit * h)
        : focus === 0
        ? ul.scrollTo(0, limit * h)
        : ul.scrollTo(0, (focus - 1) * h)
    }
    if (e.keyCode === 32) {
    }
  }

  return styled(styles)(
    <container
      tabIndex="0"
      onKeyDown={keyDown}
      onFocus={() => dispatch({ type: "open", payload: true })}
      onBlur={() => dispatch({ type: "open", payload: false })}
      {...use({ big, open })}
      {...props}
    >
      {children}
    </container>
  )
}

Container.defaultProps = {
  styles: css`
    container {
      --transition: all 200ms 100ms ease;
      --border-radius: 4px;
      --active-color: rgb(var(--primary));
      --height: 32px;
      --padding: 8px;
      --border-color: rgb(var(--frame));
      --color: rgba(var(--main), 0.8);
      --bg: #fff;
      --max-height: 0;
      --deg: 0;
      position: relative;
      font-size: 14px;
      cursor: pointer;
      outline: 0;

      &:hover {
        --border-color: var(--active-color);
      }

      &[|open] {
        --deg: 180deg;
        --border-color: var(--active-color);
        --max-height: calc(5 * var(--height));
        --box-shadow: 0px 8px 16px rgba(78, 93, 146, 0.08),
          0px 4px 4px rgba(78, 93, 146, 0.16);
      }

      &[|big] {
        --height: 48px;
        --padding: 16px;
        font-size: 16px;
      }
    }
  `,
}

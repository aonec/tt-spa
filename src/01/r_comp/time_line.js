import { css } from "reshadow/macro"

export const time_line = css`
  time_line {
    display: flex;
    align-items: center;

    & line_wrap {
      position: relative;
      flex-grow: 1;
      height: 4px;
      background: var(--bg);
      border-radius: 4px;
    }

    & line {
      position: absolute;
      border-radius: inherit;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
`

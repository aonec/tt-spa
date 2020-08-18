import { css } from "reshadow/macro"

export const tabs = css`
  tabs {
    border-bottom: 1px solid rgb(var(--frame));
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    grid-gap: 16px;
    color: rgb(var(--main));
    font-weight: 600;
    font-size: 16px;
    line-height: 2em;
  }
`

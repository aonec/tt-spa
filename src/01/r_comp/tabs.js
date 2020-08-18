import { css } from "reshadow/macro"

export const tabs = css`
  tabs {
    display: grid;
    grid-gap: 16px;
    grid-auto-flow: column;
    justify-content: start;
    border-bottom: 1px solid var(--frame);
    font-size: 16px;
    font-weight: 500;
    line-height: 2em;

    & > * {
      padding: 8px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        border-top: 2px solid transparent;
        border-radius: 4px 4px 0 0;
      }

      &:hover {
        color: var(--primary-100);
      }
    }
  }
  .active {
    color: var(--primary-100);
    &::before {
      border-color: inherit;
    }
  }
`

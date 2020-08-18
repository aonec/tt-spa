import { css } from "reshadow/macro"

export const menu = css`
  nav {
    display: contents;
    font-weight: 500;
  }

  NavLink {
    display: inline-grid;
    grid-template-columns: 16px auto;
    grid-gap: 8px;
    padding: 8px 0;
    padding-left: 16px;
    position: relative;

    & span:only-child {
      font-size: 12px;
      margin-top: -16px;
    }
    &:hover {
      color: var(--primary-100);
    }
    &::before {
      content: "";
      border-right: 2px solid transparent;
      border-radius: 0 4px 4px 0;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }

  span {
    grid-column: 2;
    & + span {
      opacity: 0.6;
      font-size: 12px;
    }
  }

  .active {
    color: var(--primary-100);
    &::before {
      border-color: inherit;
    }
  }
`

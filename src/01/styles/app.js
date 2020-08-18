import { css } from "reshadow/macro"

export const app = css`
  layout {
    height: 100vh;
    display: grid;
    grid-template-columns: 208px 1fr;
  }
  main,
  menu {
    padding-top: 16px;
    display: grid;
    grid-gap: 16px;
    align-content: start;
  }
  menu {
    background-color: var(--bg);
  }

  main {
    padding: 16px 56px;
    overflow-y: scroll;
  }
`

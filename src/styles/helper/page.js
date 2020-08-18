import { css } from "reshadow/macro"

export const page = css`
  page {
    display: grid;
    grid-gap: 16px;
    color: rgba(var(--main), 0.8);

    /* &[|loading]::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 0, 0, 0.1);
      z-index: 100;
    } */
  }

  grid {
    display: inherit;
    grid-template-columns: 8fr 4fr;
    grid-gap: 16px;
  }

  subgrid {
    display: inherit;
    grid-gap: inherit;
  }
`

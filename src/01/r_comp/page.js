import { css } from "reshadow/macro"

export const page = css`
  page,
  header_block,
  tabs_block,
  panel_block {
    display: grid;
    align-content: start;
  }

  page,
  tabs_block {
    grid-gap: 16px;
  }

  page {
    border: 1px solid blue;
    padding: 16px 56px;
    &[data-column] {
      grid-template-columns: 8fr 5fr;
    }
  }

  header_block,
  panel_block {
    padding: 8px;
    grid-column: 1 / -1;
  }

  /* ============== header =================== */
  header_block {
    grid-template-rows: 48px 16px repeat(auto-fit, minmax(16px, auto));
    grid-row-gap: 8px;
    align-items: center;
    & name {
      color: var(--main-80);
    }

    & Timeline,
    & Timer {
      color: var(--main-60);
    }
  }

  /* ================= tabs ============================= */
  tabs_block {
    grid-column: 1 / -1;
    grid-auto-flow: column;
    justify-content: start;
    border-bottom: 1px solid var(--frame);
    font-size: 16px;
    font-weight: 500;
    line-height: 2em;
    /* tabs item */
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

  /* ============== panel ================ */
  panel_block {
    box-shadow: var(--shadow);

    & > Perpetrator {
      grid-area: p;
    }
    & > Contractor {
      grid-area: c;
    }

    & > textarea {
      grid-area: ta;
    }
    & > TemplButton {
      grid-area: temp;
    }

    & > PushButton {
      grid-area: push;
    }
    &[|document] {
      grid-template-columns: 1fr auto;
      grid-template-areas: ". push";
    }

    &[|email] {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas:
        "p p p c c c"
        "ta ta ta ta temp push";
      grid-gap: 16px;
      grid-column-gap: 8px;
    }
  }

  /* =========== Loader ================*/
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  loader {
    animation: spin 1000ms linear infinite;
    &[data-center] {
      place-self: center;
    }
  }
`

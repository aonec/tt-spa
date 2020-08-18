import { css } from 'reshadow/macro'

export const styles = css`
  information {
    display: grid;
  }
  info_item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 48px;
    align-items: center;
    border-bottom: 1px solid var(--frame);
    opacity: 0.8;
    &[|url] {
      cursor: pointer;
      font-weight: 500;
      opacity: 1;
      &:hover {
        color: var(--primary-100);
      }
    }

    & span {
      padding: 8px;
      &:first-of-type {
        opacity: 0.6;
        font-weight: normal;
      }
    }
  }
`

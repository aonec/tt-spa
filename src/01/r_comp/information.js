/* eslint-disable */

import { css } from '@reshadow/macro';

export const information = css`
  information {
    display: grid;
    height: min-content;
  }
  info_item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 48px;
    align-items: center;
    border-bottom: 1px solid var(--frame);

    &:last-child {
      border-bottom: none;
    }

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
        opacity: 0.9;
        font-weight: normal;
      }
    }
  }
`;

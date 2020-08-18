import { css } from "reshadow/macro"

export const texarea = css`
  textarea {
    --h: var(--h-norm);
    --p: 8px;
    font: inherit;
    outline: 0;
    color: var(--main-80);
    border: 1px solid var(--frame);
    border-radius: 4px;
    resize: vertical;
    max-height: calc(var(--h) * 3);
    min-height: var(--h);
    padding: 8px var(--p);
    &[data-big] {
      --h: var(--h-big);
      --p: 16px;
    }

    &:hover {
      border-color: var(--primary-100);
    }
  }
`

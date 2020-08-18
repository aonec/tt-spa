import React from "react"
import styled, { css, use } from "reshadow/macro"

import { Icon } from "components"
export const UploadBtn = ({ styles, big, change }) => {
  return styled(styles)(
    <upload as="label" {...use({ big })}>
      Загрузить файл <Icon icon="upload" />
      <input type="file" multiple onChange={change} />
    </upload>
  )
}

UploadBtn.defaultProps = {
  styles: css`
    upload {
      position: relative;
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 8px;
      align-items: center;
      padding: 0 16px;
      border-radius: 4px;
      border: 1px solid rgb(var(--frame));
      color: rgb(var(--main));
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      height: 32px;

      &[|big] {
        font-size: 16px;
        height: 48px;
        padding: 0 24px;
      }

      &:hover,
      &:focus-within {
        color: rgb(var(--primary));
        border-color: initial;
      }
    }
    input {
      outline: none;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      width: 0;
      height: 0;
      position: absolute;
    }
  `,
}

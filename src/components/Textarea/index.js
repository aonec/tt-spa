import React from "react"
import styled, { css, use } from "reshadow/macro"

export const Textarea = ({ styles, big = false, ...props }) =>
  styled(styles)(<textarea rows="1" {...use({ big })} {...props} />)

Textarea.defaultProps = {
  styles: css`
    textarea {
      outline: 0;
      font: inherit;
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 4px;
      border: 1px solid rgb(var(--frame));
      min-height: 32px;
      max-height: 100px;
      resize: vertical;
      background-color: #fff;

      &:hover,
      &:focus {
        border-color: rgb(var(--primary));
      }

      &::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.1);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.6);
      }
    }
  `,
}

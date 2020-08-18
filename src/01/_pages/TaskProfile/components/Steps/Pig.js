import React from "react"
import styled from "reshadow/macro"
import { Icon } from "01/components"
import t from "prop-types"

export const Pig = ({ label = "", text = "" }) =>
  styled()`
    pig {
      display: grid;
      grid-gap: 8px;

      & label {
        font-weight: 500;
        opacity: 0.6;
      }

      & body {
        height: var(--h-big);
        border: 1px solid var(--frame);
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        background-color: var(--bg);
        color: var(--main-32);
      }
      & Icon {
        margin-left: auto;
      }
    }
  `(
    <pig>
      <label as="div">{label}</label>
      <body as="div">
        {text}
        <Icon icon="down" />
      </body>
    </pig>
  )

Pig.propTypes = {
  label: t.string.isRequired,
  text: t.string.isRequired,
}

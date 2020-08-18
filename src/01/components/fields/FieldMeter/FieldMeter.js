import React from "react"
import styled from "reshadow/macro"

export const FieldMeter = () =>
  styled()`
    fm {
      padding: 0 8px;
      border: 1px solid var(--frame);
      display: inline-grid;
      border-radius: 4px;
      color: var(--main-80);
    }

    row {
      display: grid;
      grid-template-columns: 70px 48px;
      padding: 8px;
      &:first-child {
        border-bottom: 1px solid var(--frame);
      }
    }
  `(
    <fm>
      <row>
        <input placeholder="Тариф" />
        <span>0 m</span>
      </row>
      <row>
        <input placeholder="Тариф" />
        <span>0 m</span>
      </row>
    </fm>
  )

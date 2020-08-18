import React from "react"
import styled, { css } from "reshadow/macro"

import { FieldMeter } from "01/components/fields/FieldMeter"

export const MeterDataList = ({ styles }) => {
  return styled(styles)(
    <meter_data_list>
      <m_header>Информация о приборе</m_header>
      <meter_item>
        <span>device</span>
        <span>acvien</span>
        <div>
          <FieldMeter />
        </div>
      </meter_item>
    </meter_data_list>
  )
}

MeterDataList.defaultProps = {
  styles: css`
    meter_data_list {
      border: 1px solid;
      grid-column: 1 / -1;
    }

    m_header {
      height: 48px;
      border-bottom: 1px solid var(--frame);
      background-color: var(--main-4);
      padding: 8px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      align-content: center;
      color: var(--main-80);
    }
  `,
}

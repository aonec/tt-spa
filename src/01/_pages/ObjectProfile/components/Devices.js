import React from "react"
import { Route } from "react-router-dom"
import styled from "reshadow/macro"
import { Loader, Icon } from "01/components"
import * as style from "_reshadow"

export const Devices = React.memo(
  ({ path = null, loading = true, items = [], onClick = () => {} }) => {
    console.log(items)
    return styled(style.item)`
      devices {
        display: grid;
      }
      device {
        border-bottom: 1px solid var(--frame);
        grid-template-columns: 2fr 1fr 1fr;
      }
      device_model {
        margin: 0 8px;
      }
    `(
      <Route path={path}>
        <devices>
          <h2>Список приборов ОДПУ</h2>
          <Loader show={loading} size="32" />
          {items.map(
            ({ id, fill, icon, model, serialNumber, futureCheckingDate }) => (
              <device key={id} onClick={() => onClick(id)}>
                <h4>
                  <Icon {...{ fill, icon }} />
                  <device_model>{model}</device_model>
                  <device_number>({serialNumber})</device_number>
                </h4>
                <device_status>Активен</device_status>
                <devcie_date>
                  {new Date(futureCheckingDate).toLocaleDateString()}
                </devcie_date>
              </device>
            )
          )}
        </devices>
      </Route>
    )
  }
)

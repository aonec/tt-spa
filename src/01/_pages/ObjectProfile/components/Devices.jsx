import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'reshadow/macro';
import { Loader, Icon } from '01/components';
import * as style from '_reshadow';
import convertDate, { convertDateDots } from '../../../_api/utils/convertDate';

export const Devices = React.memo(
  ({
    path = null, loading = true, items = [], onClick = () => {},
  }) => styled(style.item)`
      devices {
        display: grid;
        height: min-content;
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
            ({
              id, fill, icon, model, serialNumber, futureCheckingDate, commercialAccountingDate,
            }) => {
              console.log(model, id);
              return (
                <device key={id} onClick={() => onClick(id)}>
                  <h4>
                    <Icon {...{ fill, icon }} />
                    <device_model>{model}</device_model>
                    <device_number>
                      (
                      {serialNumber}
                      )
                    </device_number>
                  </h4>
                  <device_status>Активен</device_status>
                  <devcie_date>
                    {convertDateDots(futureCheckingDate)}
                  </devcie_date>
                </device>
              );
            },
          )}
        </devices>
      </Route>,
  ),
);

export default Devices;

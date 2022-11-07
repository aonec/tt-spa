/* eslint-disable */

import React from 'react';

import { Icon } from '01/components';

export const MeterDevices = ({ items = [] }) => {
  return (
    <meters>
      <meter_header>Информация o приборe</meter_header>
      {items.map(
        ({ id, icon, fill, model, serialNumber, futureCheckingDate }) => (
          <meter_device key={id}>
            <device_info>
              <h4>
                <Icon {...{ icon, fill }} />
                <d_model>{model}</d_model>
                <d_number>({serialNumber})</d_number>
              </h4>
              <row>
                <d_status>Активен</d_status>
                <time>{new Date(futureCheckingDate).toLocaleDateString()}</time>
                <place>Туалет</place>
              </row>
            </device_info>
            <input_meter>
              <row>
                <tarif>Тариф 1</tarif>
                <input />
              </row>
              <row>
                <tarif>Тариф 1</tarif>
                <input />
              </row>
            </input_meter>
            <input_meter>
              <row>
                <tarif>Тариф 1</tarif>
                <input />
              </row>
              <row>
                <tarif>Тариф 1</tarif>
                <input />
              </row>
            </input_meter>
            <div>
              <span>
                <Icon icon="list" />
                История показаний
              </span>
              <button>
                <Icon icon="menu" />
              </button>
            </div>
          </meter_device>
        )
      )}
    </meters>
  );
};

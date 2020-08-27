import React, { useContext } from 'react';
import styled from 'styled-components';
import { ApartmentDevice } from '../ApartmentDevice';
import { ApartmentInput } from '../ApartmentInput';
import { ApartmentDevicesHistory } from '../ApartmentDevicesHistory';

import { ApartmentDevicesContext } from '../../ApartmentDevices';
import moment from "moment";
import 'moment/locale/ru'
moment.locale('ru')

const DeviceIitem = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 2fr 3fr;
  padding: 0 16px 16px;
  border-bottom: 1px solid #DCDEE4;
`;

export function ApartmentDeviceItem(props) {
  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  const currentDevice = { ...ApartmentDevicesList[props.index] };
  const { model, serialNumber, resource, futureCheckingDate } = currentDevice;
  console.log('props', props);
  console.log('currentDevice', currentDevice);

  return (
    <DeviceIitem>
      <ApartmentDevice
        model={model}
        serialNumber={serialNumber}
        resource={resource}
        birthday="запрос данных"
        futureCheckingDate={moment(futureCheckingDate).format('DD.MM.YYYY, hh:mm')}
      />
      <ApartmentInput />
      <ApartmentInput />
      <ApartmentDevicesHistory />
    </DeviceIitem>
  );
}

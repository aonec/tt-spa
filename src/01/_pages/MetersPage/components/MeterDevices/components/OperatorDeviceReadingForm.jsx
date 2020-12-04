import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateReadings } from '../../../../../components/Select/selects/AddReadings/readingsReducer';
import DeviceRates
  from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ReadingsLine/DeviceRates';
import ActiveLine from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import { DateLine } from '../../../../../_components/DateLine/DateLine';
import { Icon } from '../../../../../_components/Icon';
import rateTypeToNumber from '../../../../../_api/utils/rateTypeToNumber';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import styles from '../../../../Devices/components/TabsDevices.module.scss';
import { translateMountPlace } from '../../../../../utils/translateMountPlace';
import Arrow from '../../../../../_components/Arrow/Arrow';

// import DeviceIcons from "../../../../../_components/DeviceIcons"

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(330px, 1fr) minmax(160px, 1fr) minmax(160px, 1fr) 1fr;
    column-gap: 16px;
    margin-top: 8px;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    padding: 8px 8px 16px;
    border-bottom: 1px solid #DCDEE4;
    `;

const OperatorDeviceReadingForm = ({ device, dispatch, sendReadings }) => {
  const [readingsState, setReadingsState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isActive = device.closingDate === null;

  const numberOfReadings = rateTypeToNumber(device.rateType);
  // const readingsArray = [];
  // setReadingsState({readingsArray: [45, 66, 1243], id: 100});
  useEffect(() => {
    setIsLoading(true);
    const previousReadingsArray = [];
    const currentReadingsArray = [];
    const prevReadings = device.readings[1] || {};
    const currentReadings = device.readings[0] || {};

    console.log(prevReadings.value1);

    for (let i = 1; i <= numberOfReadings; i++) {
      previousReadingsArray.push(prevReadings[`value${i}`] ?? '-');
      currentReadingsArray.push(currentReadings[`value${i}`] ?? '-');
    }

    // for (let i=1; i <= 2; i++) {
    //     previousReadingsArray.push(i);
    //     currentReadingsArray.push(i);
    // }

    setReadingsState({
      previousReadingsArray,
      currentReadingsArray,
      prevId: prevReadings.id,
      currId: currentReadings.id,
      resource: device.resource,
    });
    setIsLoading(false);
  }, [device.readings, numberOfReadings]);

  const onInputChange = (e, index) => {
    e.preventDefault();
    dispatch(updateReadings(device.id, index + 1, e.target.value));
  };

  if (isLoading) return 'ЗАГРУЗКА...';

  const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => (
    <DeviceRates
      key={readingsState.id || device.id + index}
      index={index}
      onChange={(e) => onInputChange(e, index)}
      value={value}
      resource={readingsState.resource}
      operatorCabinet
      sendReadings={sendReadings}
    />
  ));

  const previousDeviceReadings = readingsState.previousReadingsArray.map((value, index) => (
    <DeviceRates
      key={readingsState.id || device.id + index}
      index={index}
      onChange={(e) => onInputChange(e, index)}
      value={value}
      resource={readingsState.resource}
      operatorCabinet
      readingsBlocked
    />
  ));

  const { icon, color } = DeviceIcons[device.resource];

  return (
    <FullDeviceLine>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className={styles.device__title}
          to={`/housingMeteringDevices/${device.id}`}
        >
          <Icon className={styles.icon} icon={icon} fill={color} />
          {`${device.model} `}
          <span className={styles.deviceId}>
            {` (${device.serialNumber})`}
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          <ActiveLine isActive={isActive} />
          {/* <div style={{fontWeight: 400, color: 'rgba(39, 47, 90, 0.6)'}}>{transformDate(device.lastCheckingDate)} — {transformDate(device.futureCheckingDate)}</div> */}
          <DateLine lastCheckingDate={device.lastCheckingDate} futureCheckingDate={device.futureCheckingDate} />
          <div style={{ marginLeft: 16, color: 'rgba(39, 47, 90, 0.6)' }}>{translateMountPlace(device.mountPlace)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>{currentDeviceReadings}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>{previousDeviceReadings}</div>

    </FullDeviceLine>
  );
};

export default OperatorDeviceReadingForm;

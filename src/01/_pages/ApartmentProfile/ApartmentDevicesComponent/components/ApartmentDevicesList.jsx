import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { useParams } from 'react-router';

export function ApartmentDevicesList({ sliderIndex, showClosed }) {
  const devices = useContext(ApartmentDevicesContext);

  const params = useParams();

  if (!devices) return null;

  const validDeviceElems = devices
    ?.filter((elem) => (!showClosed ? elem.closingDate === null : true))
    .map((device) => (
      <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
    ));

  return (
    <>
      <ReadingsHistoryModal apartmentId={params[1]} />
      {validDeviceElems}
    </>
  );
}
export default ApartmentDevicesList;

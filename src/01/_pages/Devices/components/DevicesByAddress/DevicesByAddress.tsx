import React from 'react';
import { Subtitle } from '../../../../_components/Headers';
import DeviceBlock from '../DeviceBlock/DeviceBlock';
import { DevicesByAddressInterface } from '../utils/groupDevicesByObjects';

const DevicesByAddress = ({
  addressDevicesGroup,
}: DevicesByAddressPropsInterface) => {
  console.log(addressDevicesGroup)
  const { city = '', street = '', number = null, corpus = null, id = null } =
    (addressDevicesGroup.address as any)?.address?.mainAddress || {};

  const deviceElems = addressDevicesGroup.devices?.map((device) => (
    <DeviceBlock device={device} key={device.id} />
  ));

  return (
    <>
      {addressDevicesGroup.address ? (
        <Subtitle fontWeight={400} to={`/objects/${id}`}>
          {`${city}, ${street}, ${number}${corpus ? `, к.${corpus}` : ''}`}
        </Subtitle>
      ) : (
        'У данного прибора не указан адрес'
      )}
      <div
        style={{
          borderTop: '1px solid var(--frame)',
          paddingTop: 24,
          marginTop: 7,
        }}
      >
        {deviceElems}
      </div>
    </>
  );
};

interface DevicesByAddressPropsInterface {
  addressDevicesGroup: DevicesByAddressInterface;
}

export default DevicesByAddress;

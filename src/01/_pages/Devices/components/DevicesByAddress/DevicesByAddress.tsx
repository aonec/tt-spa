import { HouseAddress } from 'myApi';
import React, { FC } from 'react';
import { Switcher } from 'ui-kit/shared_components/Switcher';
import { getHousingStockAddressString } from 'utils/getHousingStockAddress';
import { Subtitle } from '../../../../_components/Headers';
import DeviceBlock from '../DeviceBlock/DeviceBlock';
import { AddressHeaderWrapper } from './DevicesByAddress.styled';
import { DevicesByAddressPropsInterface } from './DevicesByAddress.types';

export const DevicesByAddress: FC<DevicesByAddressPropsInterface> = ({
  addressDevicesGroup,
  housingsByFilter,
  setAddress,
}) => {
  const address = housingsByFilter?.current?.address;

  const nextAddress = housingsByFilter?.next?.address;
  const previousAddress = housingsByFilter?.previous?.address;

  const handleClickAddress = (address: HouseAddress) => {
    setAddress({
      'Filter.Address.City': address.city || undefined,
      'Filter.Address.Street': address.street || undefined,
      'Filter.Address.HousingStockNumber': address.houseNumber || undefined,
      'Filter.Address.Corpus': address.houseCorpus || undefined,
    });
  };

  const deviceElems = addressDevicesGroup.devices?.map((device) => (
    <DeviceBlock device={device} key={device.id} />
  ));

  return (
    <>
      {address ? (
        <AddressHeaderWrapper>
          <Subtitle
            fontWeight={400}
            to={`/objects/profile/${housingsByFilter?.current?.id}`}
          >
            {getHousingStockAddressString(address)}
          </Subtitle>
          <Switcher
            nextValue={nextAddress}
            previousValue={previousAddress}
            textConstructor={(address) => getHousingStockAddressString(address)}
            handleClick={handleClickAddress}
          />
        </AddressHeaderWrapper>
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

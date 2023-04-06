import { HouseAddress } from 'myApi';
import React, { FC, useCallback } from 'react';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';
import { Switcher } from 'ui-kit/shared_components/Switcher';
import { getHousingStockAddressString } from 'utils/getHousingStockAddress';
import { Subtitle } from '../../../../_components/Headers';
import DeviceBlock from '../DeviceBlock/DeviceBlock';
import { AddressHeaderWrapper } from './DevicesByAddress.styled';
import { DevicesByAddressPropsInterface } from './DevicesByAddress.types';

export const DevicesByAddress: FC<DevicesByAddressPropsInterface> = ({
  housingStockDevices,
  housingStocksAddressForSwitcher,
  setAddressBySwither,
  mainFilterSearchType,
  setMainFilterSearchType,
}) => {
  const address = housingStocksAddressForSwitcher?.current?.address;

  const nextAddress = housingStocksAddressForSwitcher?.next?.address;
  const previousAddress = housingStocksAddressForSwitcher?.previous?.address;

  const handleClickAddress = useCallback(
    (address: HouseAddress) => {
      if (mainFilterSearchType !== DevicesSearchType.Address) {
        setMainFilterSearchType(DevicesSearchType.Address);
      }
      setAddressBySwither({
        'Filter.Address.City': address.city || undefined,
        'Filter.Address.Street': address.street || undefined,
        'Filter.Address.HousingStockNumber': address.houseNumber || undefined,
        'Filter.Address.Corpus': address.houseCorpus || undefined,
      });
    },
    [setAddressBySwither, mainFilterSearchType, setMainFilterSearchType],
  );

  const deviceElems = housingStockDevices.devices?.map((device) => (
    <DeviceBlock device={device} key={device.id} />
  ));

  return (
    <>
      {address ? (
        <AddressHeaderWrapper>
          <Subtitle
            fontWeight={400}
            to={`/objects/profile/${housingStocksAddressForSwitcher?.current?.id}`}
          >
            {getHousingStockAddressString(address)} 333
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

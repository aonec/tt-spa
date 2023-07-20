import React, { FC, useCallback } from 'react';
import { HousingStockCalculatorsProps } from './HousingStockCalculators.types';
import { HouseAddress } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import {
  CalculatorNodesListWrapper,
  HousingStockAddress,
  HousingStockAddressHeaderWrapper,
} from './HousingStockCalculators.styled';
import { Switcher } from 'ui-kit/sharedComponents/Switcher';
import { getHousingStockAddressString } from 'utils/getBuildingAddress';
import { CalculatorNodes } from './CalculatorNodes';

export const HousingStockCalculators: FC<HousingStockCalculatorsProps> = ({
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

  const calculators = housingStockDevices.devices;

  const calculatorNodesList = calculators.map((calculator) => (
    <CalculatorNodes calculator={calculator} key={calculator.id} />
  ));

  return (
    <>
      {address ? (
        <HousingStockAddressHeaderWrapper>
          {/* Дождаться правок */}
          <HousingStockAddress
            to={`/buildings/LivingProfile/${housingStocksAddressForSwitcher?.current?.id}`}
          >
            {getHousingStockAddressString(address)}
          </HousingStockAddress>
          <Switcher
            nextValue={nextAddress}
            previousValue={previousAddress}
            textConstructor={(address) => getHousingStockAddressString(address)}
            handleClick={handleClickAddress}
          />
        </HousingStockAddressHeaderWrapper>
      ) : (
        'У данного прибора не указан адрес'
      )}
      <CalculatorNodesListWrapper>
        {calculatorNodesList}
      </CalculatorNodesListWrapper>
    </>
  );
};

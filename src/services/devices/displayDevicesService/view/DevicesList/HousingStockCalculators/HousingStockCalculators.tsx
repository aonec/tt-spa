import React, { FC, useCallback, useMemo } from 'react';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { HousingStockCalculatorsProps } from './HousingStockCalculators.types';
import { EHouseCategory, BuildingAddress } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import {
  CalculatorNodesListWrapper,
  HousingStockAddress,
  HousingStockAddressHeaderWrapper,
} from './HousingStockCalculators.styled';
import { Switcher } from 'ui-kit/shared/Switcher';
import {
  getBuildingAddress,
  getBuildingAddressString,
} from 'utils/getBuildingAddress';
import { CalculatorNodes } from './CalculatorNodes';

export const HousingStockCalculators: FC<HousingStockCalculatorsProps> = ({
  housingStockDevices,
  housingStocksAddressForSwitcher,
  setAddressBySwither,
  mainFilterSearchType,
  setMainFilterSearchType,
}) => {
  const nextAddress = housingStocksAddressForSwitcher?.next?.address;
  const previousAddress = housingStocksAddressForSwitcher?.previous?.address;

  const handleClickAddress = useCallback(
    (address: BuildingAddress) => {
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

  const buildingProfilePath = useMemo(() => {
    if (housingStockDevices.building?.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [housingStockDevices]);

  const addressComponent = useMemo(() => {
    if (!housingStockDevices.building) {
      return 'У данного прибора не указан адрес';
    }
    const { address, id } = housingStockDevices.building;

    const additionalAddressesString = (address?.additionalAddresses || [])
      .map((elem) => {
        const corpusText = elem.corpus ? `, к.${elem.corpus}` : '';
        return `${elem.street}, ${elem.number}${corpusText}`;
      })
      .join('; ');

    const fullAddress = additionalAddressesString
      ? `${getBuildingAddress({
          address,
        })}; ${additionalAddressesString}`
      : getBuildingAddress({
          address,
        });

    return (
      <HousingStockAddressHeaderWrapper>
        <Tooltip title={fullAddress}>
          <HousingStockAddress to={`/buildings/${buildingProfilePath}/${id}`}>
            {fullAddress}
          </HousingStockAddress>
        </Tooltip>
        <Switcher
          nextValue={nextAddress}
          previousValue={previousAddress}
          textConstructor={(address) => getBuildingAddressString(address)}
          handleClick={handleClickAddress}
        />
      </HousingStockAddressHeaderWrapper>
    );
  }, [
    handleClickAddress,
    buildingProfilePath,
    nextAddress,
    previousAddress,
    housingStockDevices,
  ]);

  return (
    <>
      {addressComponent}
      <CalculatorNodesListWrapper>
        {calculatorNodesList}
      </CalculatorNodesListWrapper>
    </>
  );
};

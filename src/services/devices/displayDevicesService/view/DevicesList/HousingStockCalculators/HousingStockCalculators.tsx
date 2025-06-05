import React, { FC, useCallback, useMemo } from 'react';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { HousingStockCalculatorsProps } from './HousingStockCalculators.types';
import { EHouseCategory, BuildingAddress } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import {
  AddressWrapper,
  HousingStockAddress,
  HousingStockAddressHeaderWrapper,
  NodesListWrapper,
  Wrapper,
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
        'Address.City': address.city || undefined,
        'Address.Street': address.street || undefined,
        'Address.HousingStockNumber': address.houseNumber || undefined,
        'Address.Corpus': address.houseCorpus || undefined,
      });
    },
    [setAddressBySwither, mainFilterSearchType, setMainFilterSearchType],
  );

  const pipeNodeDevicesGroupedByCalculator = housingStockDevices.devices;

  const calculatorNodesList = pipeNodeDevicesGroupedByCalculator.map(
    (pipeNodeDevices) => (
      <CalculatorNodes
        devices={pipeNodeDevices}
        key={pipeNodeDevices[0].calculatorId}
      />
    ),
  );

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
    <Wrapper>
      <AddressWrapper>{addressComponent}</AddressWrapper>
      <NodesListWrapper>{calculatorNodesList}</NodesListWrapper>
    </Wrapper>
  );
};

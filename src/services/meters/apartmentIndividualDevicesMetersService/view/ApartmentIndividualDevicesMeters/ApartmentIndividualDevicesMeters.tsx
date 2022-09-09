import React, { FC, useMemo } from 'react';
import { Skeleton } from 'antd';
import { ChevronIcon } from 'ui-kit/icons';
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { PREVIOUS_READING_INDEX_LIMIT } from '../../apartmentIndividualDevicesMetersService.constants';
import { getReadingsMonthByShift } from '../../apartmentIndividualDevicesMetersService.utils';
import {
  ArrowContainer,
  CurrentReading,
  DeviceInfo,
  DeviceShowClosedDevicesCheckbox,
  Header,
  HeaderBlock,
  MonthSliderWrapper,
  RightChevron,
} from './ApartmentIndividualDevicesMeters.styled';
import { ApartmentIndividualDevicesMetersProps } from './ApartmentIndividualDevicesMeters.types';

export const ApartmentIndividualDevicesMeters: FC<ApartmentIndividualDevicesMetersProps> = ({
  individualDevicesList,
  isLoading,
  closedDevicesCount,
  isShowClosedDevices,
  setIsShowClosedDevices,
  sliderIndex,
  upSliderIndex,
  downSliderIndex,
  openReadingsHistoryModal,
  managementFirmConsumptionRates,
}) => {
  const closedDevicesCountString = closedDevicesCount
    ? `(${closedDevicesCount})`
    : '';

  const prevReadingMonth = getReadingsMonthByShift(sliderIndex);
  const currentReadingMonth = getReadingsMonthByShift(-1);

  const isCanUp = sliderIndex < PREVIOUS_READING_INDEX_LIMIT;
  const isCanDown = sliderIndex > 0;

  return (
    <div>
      <Header>
        <HeaderBlock>
          <DeviceInfo>Информация о приборе</DeviceInfo>
          <DeviceShowClosedDevicesCheckbox
            checked={isShowClosedDevices}
            onChange={(e) => setIsShowClosedDevices(e.target.checked)}
            disabled={!closedDevicesCount}
          >
            Показать закрытые {closedDevicesCountString}
          </DeviceShowClosedDevicesCheckbox>
        </HeaderBlock>
        <MonthSliderWrapper>
          <ArrowContainer onClick={upSliderIndex} isDisabled={!isCanUp}>
            <ChevronIcon />
          </ArrowContainer>
          <div>{prevReadingMonth}</div>
          <ArrowContainer onClick={downSliderIndex} isDisabled={!isCanDown}>
            <RightChevron />
          </ArrowContainer>
        </MonthSliderWrapper>
        <CurrentReading>{currentReadingMonth}</CurrentReading>
      </Header>
      {isLoading && <Skeleton active />}
      {!isLoading &&
        individualDevicesList.map((device, index) => (
          <IndividualDeviceMetersInputContainer
            sliderIndex={sliderIndex}
            device={device}
            deviceIndex={index}
            openReadingsHistoryModal={openReadingsHistoryModal}
            managementFirmConsumptionRates={managementFirmConsumptionRates}
          />
        ))}
    </div>
  );
};

import { Checkbox, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { ChevronIcon } from 'ui-kit/icons';
import { PREVIOUS_READING_INDEX_LIMIT } from '../../apartmentIndividualDevicesMetersService.constants';
import { getReadingsMonthByShift } from '../../apartmentIndividualDevicesMetersService.utils';
import {
  ArrowContainer,
  Header,
  MonthSliderWrapper,
  Wrapper,
} from './ApartmentIndividualDevicesMeters.styled';
import { ApartmentIndividualDevicesMetersProps } from './ApartmentIndividualDevicesMeters.types';

export const ApartmentIndividualDevicesMeters: FC<
  ApartmentIndividualDevicesMetersProps
> = ({
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
  maxWidth,
  editable,
}) => {
  const closedDevicesCountString = closedDevicesCount
    ? `(${closedDevicesCount})`
    : '';

  const prevReadingMonth = useMemo(
    (): string => getReadingsMonthByShift(sliderIndex),
    [sliderIndex],
  );
  const currentReadingMonth = useMemo(() => getReadingsMonthByShift(-1), []);

  const isCanUp = useMemo(
    () => sliderIndex < PREVIOUS_READING_INDEX_LIMIT,
    [sliderIndex],
  );
  const isCanDown = useMemo(() => sliderIndex > 0, [sliderIndex]);

  return (
    <Wrapper maxWidth={maxWidth}>
      <Header>
        <div className="header-block">
          <div className="device-info">Информация о приборе</div>
          <Checkbox
            checked={isShowClosedDevices}
            onChange={(e) => setIsShowClosedDevices(e.target.checked)}
            disabled={!closedDevicesCount}
            className="device-show-closed-devices-checkbox"
          >
            Показать закрытые {closedDevicesCountString}
          </Checkbox>
        </div>
        <MonthSliderWrapper>
          <ArrowContainer onClick={upSliderIndex} isDisabled={!isCanUp}>
            <ChevronIcon />
          </ArrowContainer>
          <div>{prevReadingMonth}</div>
          <ArrowContainer onClick={downSliderIndex} isDisabled={!isCanDown}>
            <ChevronIcon className="right-chevron" />
          </ArrowContainer>
        </MonthSliderWrapper>
        <div className="current-reading">{currentReadingMonth}</div>
      </Header>
      {isLoading && <Skeleton active />}
      {!isLoading &&
        individualDevicesList.map((device, index) => (
          <IndividualDeviceMetersInputContainer
            devices={individualDevicesList}
            sliderIndex={sliderIndex}
            device={device}
            deviceIndex={index}
            openReadingsHistoryModal={openReadingsHistoryModal}
            managementFirmConsumptionRates={managementFirmConsumptionRates}
            editable={editable}
          />
        ))}
    </Wrapper>
  );
};

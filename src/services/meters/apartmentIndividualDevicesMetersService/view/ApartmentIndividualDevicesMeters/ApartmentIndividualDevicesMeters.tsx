import { Checkbox, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { ChevronIcon } from 'ui-kit/icons';
import { previousReadingIndexLimit } from '../../apartmentIndividualDevicesMetersService.constants';
import { getReadingsMonthByShift } from '../../apartmentIndividualDevicesMetersService.utils';
import {
  ArrowContainer,
  Header,
  MonthSliderWrapper,
  Wrapper,
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
}) => {
  const closedDevicesCountString = closedDevicesCount
    ? `(${closedDevicesCount})`
    : '';

  const prevReadingMonth = useMemo(() => getReadingsMonthByShift(sliderIndex), [
    sliderIndex,
  ]);
  const currentReadingMonth = useMemo(() => getReadingsMonthByShift(-1), []);

  const isCanUp = useMemo(() => sliderIndex < previousReadingIndexLimit, [
    sliderIndex,
  ]);
  const isCanDown = useMemo(() => sliderIndex > 0, [sliderIndex]);

  return (
    <Wrapper>
      <Header>
        <div className="device-info">Информация о приборе</div>
        <Checkbox
          checked={isShowClosedDevices}
          onChange={(e) => setIsShowClosedDevices(e.target.checked)}
          disabled={!closedDevicesCount}
        >
          Показать закрытые {closedDevicesCountString}
        </Checkbox>
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
        individualDevicesList.map(({ id, model, serialNumber }) => (
          <div key={id}>
            {serialNumber} {model}
          </div>
        ))}
    </Wrapper>
  );
};

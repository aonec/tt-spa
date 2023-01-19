import React, { FC, useState } from 'react';
import { HousesIndividualDevicesMetersContainerProps } from './housesIndividualDevicesMetersService.types';
import { HousesIndividualDevicesHeader } from './view/HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { PREVIOUS_READING_INDEX_LIMIT } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { IndividualDeviceMetersInputContainer } from '../individualDeviceMetersInputService';

export const HousesIndividualDevicesMetersContainer: FC<HousesIndividualDevicesMetersContainerProps> = ({
  individualDevicesList,
  openReadingsHistoryModal,
  managementFirmConsumptionRates,
  loadNextPageOfIndividualDevicesList,
  allDevicesLength,
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const isCanUp = sliderIndex < PREVIOUS_READING_INDEX_LIMIT;
  const isCanDown = sliderIndex > 0;

  const upSliderIndex = () => isCanUp && setSliderIndex((prev) => prev + 1);
  const downSliderIndex = () => isCanDown && setSliderIndex((prev) => prev - 1);

  const prevReadingMonth = getReadingsMonthByShift(sliderIndex);
  const currentReadingMonth = getReadingsMonthByShift(-1);

  const renderDevice = ({ key, index }: any) => {
    const device = individualDevicesList[index];

    return (
      <IndividualDeviceMetersInputContainer
        key={key}
        devices={individualDevicesList}
        device={device}
        sliderIndex={sliderIndex}
        openReadingsHistoryModal={openReadingsHistoryModal}
        managementFirmConsumptionRates={managementFirmConsumptionRates}
        deviceIndex={index}
        isHousingStocksReadingInputs
      />
    );
  };

  if (!allDevicesLength) return null;

  return (
    <>
      <HousesIndividualDevicesHeader
        upSliderIndex={upSliderIndex}
        downSliderIndex={downSliderIndex}
        prevReadingMonth={prevReadingMonth}
        currentReadingMonth={currentReadingMonth}
        isCanUp={isCanUp}
        isCanDown={isCanDown}
      />
      <InfiniteLoader
        isItemLoaded={(index) => index < individualDevicesList.length}
        itemCount={allDevicesLength}
        loadMoreItems={loadNextPageOfIndividualDevicesList}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            height={500}
            width={500}
            itemCount={allDevicesLength}
            itemSize={120}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {renderDevice}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </>
  );
};

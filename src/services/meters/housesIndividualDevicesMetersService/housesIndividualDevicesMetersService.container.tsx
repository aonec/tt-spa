import React, { FC, ReactNode, useState } from 'react';
import { HousesIndividualDevicesMetersContainerProps } from './housesIndividualDevicesMetersService.types';
import { HousesIndividualDevicesHeader } from './view/HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { PREVIOUS_READING_INDEX_LIMIT } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import {
  VariableSizeList as List,
  ListOnItemsRenderedProps,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { IndividualDeviceMetersInputContainer } from '../individualDeviceMetersInputService';
import { EIndividualDeviceRateType } from 'myApi';

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

  const hasNextPage = allDevicesLength === individualDevicesList.length;

  const itemCount = hasNextPage
    ? individualDevicesList.length + 1
    : individualDevicesList.length;

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
        itemCount={itemCount}
        loadMoreItems={loadNextPageOfIndividualDevicesList}
      >
        {({ onItemsRendered, ref }) => (
          <List
            style={{
              overflowX: 'hidden',
            }}
            // className="no-scrollbars"
            height={500}
            width={960}
            itemCount={itemCount}
            itemSize={(index) => {
              const device = individualDevicesList[index];

              if (!device) return 0;

              if (device.rateType === EIndividualDeviceRateType.OneZone) {
                return 80;
              } else if (
                device.rateType === EIndividualDeviceRateType.TwoZone
              ) {
                return 98;
              } else {
                return 116;
              }
            }}
            useIsScrolling
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {(params) => {
              const { index, style } = params;
              const device = individualDevicesList[index];

              if (!device) return null;

              const deviceIndex = individualDevicesList.findIndex(
                ({ id }) => device.id === id
              );

              console.log(index, deviceIndex);

              return (
                <div key={device.id} style={style}>
                  <IndividualDeviceMetersInputContainer
                    devices={individualDevicesList}
                    device={device}
                    sliderIndex={sliderIndex}
                    openReadingsHistoryModal={openReadingsHistoryModal}
                    managementFirmConsumptionRates={
                      managementFirmConsumptionRates
                    }
                    deviceIndex={deviceIndex}
                    isHousingStocksReadingInputs
                  />
                </div>
              );
            }}
          </List>
        )}
      </InfiniteLoader>
    </>
  );
};

// 80 98 116

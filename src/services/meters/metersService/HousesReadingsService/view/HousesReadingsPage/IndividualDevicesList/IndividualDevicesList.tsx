import React, { FC, useCallback, useState } from 'react';
import { LoadButtonWrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { Button } from 'ui-kit/Button';
import { HousesIndividualDevicesHeader } from './HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { PREVIOUS_READING_INDEX_LIMIT } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { InfiniteLoader, List, WindowScroller } from 'react-virtualized';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  individualDevicesList,
  loadNextPageOfIndividualDevicesList,
  isLoadingIndividualDevices,
  managementFirmConsumptionRates,
  openReadingsHistoryModal,
  isAllDevicesLoaded,
  totalItems,
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const isCanUp = sliderIndex < PREVIOUS_READING_INDEX_LIMIT;
  const isCanDown = sliderIndex > 0;

  const upSliderIndex = useCallback(
    () => isCanUp && setSliderIndex((prev) => prev + 1),
    [setSliderIndex, isCanUp],
  );
  const downSliderIndex = useCallback(
    () => isCanDown && setSliderIndex((prev) => prev - 1),
    [setSliderIndex, isCanDown],
  );

  const prevReadingMonth = getReadingsMonthByShift(sliderIndex);
  const currentReadingMonth = getReadingsMonthByShift(-1);

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
      <WindowScroller>
        {({ isScrolling, scrollTop, height }) => (
          <>
            <InfiniteLoader
              isRowLoaded={({ index }) => index < individualDevicesList.length}
              rowCount={totalItems}
              loadMoreRows={() =>
                new Promise((res) => res(loadNextPageOfIndividualDevicesList()))
              }
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  width={960}
                  rowHeight={80}
                  rowCount={individualDevicesList.length}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  overscanRowCount={8}
                  rowRenderer={({ index, style, key }) => {
                    return individualDevicesList[index] ? (
                      <IndividualDeviceMetersInputContainer
                        key={key}
                        devices={individualDevicesList}
                        device={individualDevicesList[index]}
                        sliderIndex={sliderIndex}
                        openReadingsHistoryModal={openReadingsHistoryModal}
                        managementFirmConsumptionRates={
                          managementFirmConsumptionRates
                        }
                        deviceIndex={index}
                        isHousingStocksReadingInputs
                        style={style}
                      />
                    ) : null;
                  }}
                />
              )}
            </InfiniteLoader>
            {!isAllDevicesLoaded && (
              <LoadButtonWrapper>
                <Button
                  onClick={loadNextPageOfIndividualDevicesList}
                  isLoading={isLoadingIndividualDevices}
                >
                  Загрузить приборы
                </Button>
              </LoadButtonWrapper>
            )}
          </>
        )}
      </WindowScroller>
    </>
  );
};

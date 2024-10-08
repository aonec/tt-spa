import React, { FC, useCallback, useState } from 'react';
import { LoadButtonWrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { Button } from 'ui-kit/Button';
import { HousesIndividualDevicesHeader } from './HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { IndividualDeviceMetersInputContainer } from 'services/meters/individualDeviceMetersInputService';
import { PREVIOUS_READING_INDEX_LIMIT } from 'services/meters/apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { InfiniteLoader, List, WindowScroller } from 'react-virtualized';
import { LIST_SCALE } from './IndividualDevicesList.constants';
import { getRateNum } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.utils';

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
  const [startIndex, setStartIndex] = useState(0);

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
      <WindowScroller scrollingResetTimeInterval={0}>
        {({ isScrolling, scrollTop, height, onChildScroll }) => (
          <>
            <InfiniteLoader
              isRowLoaded={({ index }) => index < individualDevicesList.length}
              rowCount={totalItems}
              loadMoreRows={() =>
                new Promise((res) => res(loadNextPageOfIndividualDevicesList()))
              }
            >
              {({ onRowsRendered, registerChild }) => {
                return (
                  <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    width={960}
                    rowHeight={({ index }) =>
                      60 +
                      LIST_SCALE *
                        getRateNum(individualDevicesList[index].rateType)
                    }
                    rowCount={individualDevicesList.length}
                    onRowsRendered={(props) => {
                      setStartIndex(props.overscanStartIndex);
                      onRowsRendered(props);
                    }}
                    ref={registerChild}
                    noRowsRenderer={() => <></>}
                    overscanRowCount={12}
                    rowRenderer={({ index, style, key }) => {
                      return (
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
                          shift={startIndex}
                          style={style}
                          isHousingStocksReadingInputs
                        />
                      );
                    }}
                  />
                );
              }}
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

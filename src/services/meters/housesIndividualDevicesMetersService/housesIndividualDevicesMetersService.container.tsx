import React, { FC, useMemo, useState } from 'react';
import { HousesIndividualDevicesMetersContainerProps } from './housesIndividualDevicesMetersService.types';
import { IndividualDeviceMetersInputContainer } from '../individualDeviceMetersInputService';
import { HousesIndividualDevicesHeader } from './view/HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { PREVIOUS_READING_INDEX_LIMIT } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';

export const HousesIndividualDevicesMetersContainer: FC<HousesIndividualDevicesMetersContainerProps> = ({
  individualDevicesList,
  openReadingsHistoryModal,
  managementFirmConsumptionRates,
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const isCanUp = sliderIndex < PREVIOUS_READING_INDEX_LIMIT;
  const isCanDown = sliderIndex > 0;

  const upSliderIndex = () => isCanUp && setSliderIndex((prev) => prev + 1);
  const downSliderIndex = () => isCanDown && setSliderIndex((prev) => prev - 1);

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
      {individualDevicesList.map((device, index) => (
        <IndividualDeviceMetersInputContainer
          key={device.id}
          devices={individualDevicesList}
          device={device}
          sliderIndex={sliderIndex}
          openReadingsHistoryModal={openReadingsHistoryModal}
          managementFirmConsumptionRates={managementFirmConsumptionRates}
          deviceIndex={index}
          isHousingStocksReadingInputs
        />
      ))}
    </>
  );
};

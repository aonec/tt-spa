import React, { FC, useMemo, useState } from 'react';
import { HousesIndividualDevicesMetersContainerProps } from './housesIndividualDevicesMetersService.types';
import { IndividualDeviceMetersInputContainer } from '../individualDeviceMetersInputService';
import { HousesIndividualDevicesHeader } from './view/HousesIndividualDevicesHeader';
import { getReadingsMonthByShift } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.utils';
import { previousReadingIndexLimit } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';

export const HousesIndividualDevicesMetersContainer: FC<HousesIndividualDevicesMetersContainerProps> = ({
  individualDevicesList,
  openReadingsHistoryModal,
  managementFirmConsumptionRates,
}) => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const isCanUp = sliderIndex < previousReadingIndexLimit;
  const isCanDown = sliderIndex > 0;

  const upSliderIndex = () => isCanUp && setSliderIndex((prev) => prev + 1);
  const downSliderIndex = () => isCanDown && setSliderIndex((prev) => prev - 1);

  const prevReadingMonth = getReadingsMonthByShift(sliderIndex);
  const currentReadingMonth = useMemo(() => getReadingsMonthByShift(-1), []);

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

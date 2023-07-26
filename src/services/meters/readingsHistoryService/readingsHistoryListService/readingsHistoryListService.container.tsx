import React, { FC, useMemo } from 'react';
import { useEvent, useStore } from 'effector-react';
import { apartmentService } from 'services/apartments/apartmentService';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService';
import {
  managementFirmConsumptionRatesService,
  useManagingFirmConsumptionRates,
} from 'services/meters/managementFirmConsumptionRatesService';
import {
  useOpenedYears,
  useReadingHistoryValues,
} from './readingsHistoryListService.hook';
import { ReadingsHistoryContainerProps } from './readingsHistoryListService.types';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { readingsHistoryService } from '../readingsHistoryService.model';
import { ReadingsHistoryList } from './view/ReadingsHistoryList';

const {
  outputs: { $individualDevice },
} = displayIndividualDeviceAndNamesService;

const { outputs, inputs } = managementFirmConsumptionRatesService;

export const ReadingsHistoryListContainer: FC<
  ReadingsHistoryContainerProps
> = ({ readonly = false }) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
    deleteReading,
    resetValue,
  } = useReadingHistoryValues();

  const device = useStore($individualDevice);

  const readingsHistory = values;

  const pendingHistory = useStore(
    readingsHistoryService.outputs.$isReadingsHistoryLoading,
  );

  const consumptionRates = useStore(outputs.$consumptionRates);
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates,
  );

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    device?.managementFirmId,
  );

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  const rateNum = useMemo(
    () => device && getIndividualDeviceRateNumByName(device.rateType),
    [device],
  );

  const apartment = useStore(apartmentService.outputs.$apartment);

  return (
    <ReadingsHistoryList
      readonly={readonly}
      device={device}
      apartment={apartment}
      readingsHistory={readingsHistory}
      setFieldValue={setFieldValue}
      uploadingReadingsStatuses={uploadingReadingsStatuses}
      uploadReading={uploadReading}
      deleteReading={deleteReading}
      resetValue={resetValue}
      pendingHistory={pendingHistory}
      rateNum={rateNum}
      managementFirmConsumptionRates={managementFirmConsumptionRates}
      isYearOpen={isYearOpen}
      openYear={openYear}
      closeYear={closeYear}
      openMonth={openMonth}
      closeMonth={closeMonth}
      isMonthOpen={isMonthOpen}
    />
  );
};

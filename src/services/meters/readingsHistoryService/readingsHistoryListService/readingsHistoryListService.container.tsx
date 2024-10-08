import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
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
> = ({ readonly = false, isModal }) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
    deleteReading,
    resetValue,
  } = useReadingHistoryValues();

  const {
    consumptionRates,
    device,
    loadConsumptionRates,
    pendingHistory,
    apartment,
  } = useUnit({
    device: $individualDevice,
    pendingHistory: readingsHistoryService.outputs.$isReadingsHistoryLoading,
    consumptionRates: outputs.$consumptionRates,
    loadConsumptionRates: inputs.loadManagemenFirmConsumptionRates,
    apartment: apartmentService.outputs.$apartment,
  });

  const readingsHistory = values;

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
      isModal={isModal}
    />
  );
};

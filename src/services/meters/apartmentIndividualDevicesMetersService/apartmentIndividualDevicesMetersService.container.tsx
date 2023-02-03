import React, { FC } from 'react';
import { useEvent, useStore } from 'effector-react';
import { CloseIndividualDeviceModal } from '01/features/individualDevices/closeIndividualDevice';
import { DeleteIndividualDeviceModalContainer } from '01/features/individualDevices/deleteIndividualDevice/DeleteIndividualDeviceModalContainer';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { apartmentIndividualDevicesMetersService } from './apartmentIndividualDevicesMetersService.model';
import { ApartmentIndividualDevicesMeters } from './view/ApartmentIndividualDevicesMeters';
import { useManagingFirmConsumptionRates } from '../managementFirmConsumptionRatesService';
import { Params } from './apartmentIndividualDevicesMetersService.types';
import { EditReadingsHistoryContainer } from '../editReadingsHistoryService';
import { CurrentManagingFirmUserGate } from '01/features/managementFirmUsers/displayCurrentUser/models';

const {
  inputs,
  outputs,
  gates: { IndividualDevicesGate },
} = apartmentIndividualDevicesMetersService;

export const ApartmentIndividualDevicesMetersContainer: FC<Params> = ({
  apartment,
  maxWidth,
  editable,
}) => {
  const individualDevicesList = useStore(
    outputs.$filteredIndividualDevicesList,
  );
  const isLoading = useStore(outputs.$isLoading);
  const isShowClosedDevices = useStore(outputs.$isShowClosedIndividualDevices);
  const closedDevicesCount = useStore(outputs.$closedDevicesCount);
  const sliderIndex = useStore(outputs.$sliderIndex);
  const consumptionRates = useStore(outputs.$consumptionRates);

  const setIsShowClosedDevices = useEvent(inputs.setIsShowClosedDevices);
  const upSliderIndex = useEvent(inputs.upSliderIndex);
  const downSliderIndex = useEvent(inputs.downSliderIndex);
  const openReadingsHistoryModal = useEvent(inputs.openReadingsHistoryModal);
  const loadConsumptionRates = useEvent(inputs.loadConsumptionRates);

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    apartment?.housingStock?.managingFirmId,
  );

  const apartmentId = apartment?.id;

  return (
    <>
      {apartmentId && (
        <IndividualDevicesGate ApartmentId={Number(apartmentId)} />
      )}
      <CurrentManagingFirmUserGate />
      <ReadingsHistoryModal />
      <CloseIndividualDeviceModal />
      <ConfirmReadingValueModal />
      <EditReadingsHistoryContainer />
      <DeleteIndividualDeviceModalContainer />
      <ApartmentIndividualDevicesMeters
        individualDevicesList={individualDevicesList}
        isLoading={isLoading}
        isShowClosedDevices={isShowClosedDevices}
        setIsShowClosedDevices={setIsShowClosedDevices}
        closedDevicesCount={closedDevicesCount}
        sliderIndex={sliderIndex}
        upSliderIndex={() => upSliderIndex()}
        downSliderIndex={() => downSliderIndex()}
        openReadingsHistoryModal={openReadingsHistoryModal}
        managementFirmConsumptionRates={managementFirmConsumptionRates}
        maxWidth={maxWidth}
        editable={editable}
      />
    </>
  );
};

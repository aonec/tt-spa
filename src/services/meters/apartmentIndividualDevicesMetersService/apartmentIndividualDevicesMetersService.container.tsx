import { CloseIndividualDeviceModal } from '01/features/individualDevices/closeIndividualDevice';
import { DeleteIndividualDeviceModalContainer } from '01/features/individualDevices/deleteIndividualDevice/DeleteIndividualDeviceModalContainer';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useManagingFirmConsumptionRates } from '../managementFirmConsumptionRatesService';
import { apartmentIndividualDevicesMetersService } from './apartmentIndividualDevicesMetersService.model';
import { ApartmentIndividualDevicesMeters } from './view/ApartmentIndividualDevicesMeters';

const {
  inputs,
  outputs,
  gates: { IndividualDevicesGate },
} = apartmentIndividualDevicesMetersService;

export const ApartmentIndividualDevicesMetersContainer = () => {
  const { id } = useParams<{ id: string }>();

  const individualDevicesList = useStore(outputs.$individualDevicesList);
  const isLoading = useStore(outputs.$isLoading);
  const isShowClosedDevices = useStore(outputs.$isShowClosedIndividualDevices);
  const closedDevicesCount = useStore(outputs.$closedDevicesCount);
  const sliderIndex = useStore(outputs.$sliderIndex);
  const consumptionRates = useStore(outputs.$consumptionRates);
  const apartment = useStore(outputs.$apartment);

  const setIsShowClosedDevices = useEvent(inputs.setIsShowClosedDevices);
  const upSliderIndex = useEvent(inputs.upSliderIndex);
  const downSliderIndex = useEvent(inputs.downSliderIndex);
  const openReadingsHistoryModal = useEvent(inputs.openReadingsHistoryModal);
  const loadConsumptionRates = useEvent(inputs.loadConsumptionRates);

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    apartment?.housingStock?.managingFirmId
  );

  return (
    <>
      {id && <IndividualDevicesGate ApartmentId={Number(id)} />}
      <ReadingsHistoryModal />
      <CloseIndividualDeviceModal />
      <ConfirmReadingValueModal />
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
      />
    </>
  );
};

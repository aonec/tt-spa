import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { ReadingsHistoryContainer } from 'services/meters/readingsHistoryService/readingsHistoryService.container';
import { DeleteIndividualDeviceModalContainer } from 'services/devices/individualDevices/deleteIndividualDevice/DeleteIndividualDeviceModalContainer';
import { apartmentIndividualDevicesMetersService } from './apartmentIndividualDevicesMetersService.model';
import { ApartmentIndividualDevicesMeters } from './view/ApartmentIndividualDevicesMeters';
import { useManagingFirmConsumptionRates } from '../managementFirmConsumptionRatesService';
import { Params } from './apartmentIndividualDevicesMetersService.types';
import { EditReadingsHistoryContainer } from '../editReadingsHistoryService';
import { CloseIndividualDeviceContainer } from 'services/devices/individualDevices/closeIndividualDeviceService';
import { ConfirmReadingValueContainer } from '../readingsHistoryService/confirmReadingService';
import { OpenIndividualDeviceContainer } from 'services/devices/individualDevices/openIndividualDevice';

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
  const {
    closedDevicesCount,
    consumptionRates,
    downSliderIndex,
    individualDevicesList,
    isLoading,
    isShowClosedDevices,
    loadConsumptionRates,
    openReadingsHistoryModal,
    setIsShowClosedDevices,
    sliderIndex,
    upSliderIndex,
  } = useUnit({
    individualDevicesList: outputs.$filteredIndividualDevicesList,
    isLoading: outputs.$isLoading,
    isShowClosedDevices: outputs.$isShowClosedIndividualDevices,
    closedDevicesCount: outputs.$closedDevicesCount,
    sliderIndex: outputs.$sliderIndex,
    consumptionRates: outputs.$consumptionRates,
    setIsShowClosedDevices: inputs.setIsShowClosedDevices,
    upSliderIndex: inputs.upSliderIndex,
    downSliderIndex: inputs.downSliderIndex,
    openReadingsHistoryModal: inputs.openReadingsHistoryModal,
    loadConsumptionRates: inputs.loadConsumptionRates,
  });

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
      <ReadingsHistoryContainer readonly={!editable} />
      <CloseIndividualDeviceContainer />
      <ConfirmReadingValueContainer />
      <EditReadingsHistoryContainer />
      <DeleteIndividualDeviceModalContainer />
      <OpenIndividualDeviceContainer />
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

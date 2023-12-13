import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { editIndividualDeviceService } from './editIndividualDeviceService.model';
import { EditIndividualPage } from './EditIndividualPage';
import { useHistory, useParams } from 'react-router-dom';
import { individualDeviceMountPlacesService } from '../../devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';

const { inputs, outputs, gates } = editIndividualDeviceService;
const { FetchIndividualDeviceGate } = gates;
const { AllIndividualDeviceMountPlacesGate, IndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const EditIndividualDeviceContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const history = useHistory();
  const onCancel = () => history.goBack();

  const {
    currentTab,
    handleChangeTab,
    handleUpdateDevice,
    individualDevice,
    isDeviceLoading,
    isDeviceUpdating,
    mountPlaces,
  } = useUnit({
    handleChangeTab: inputs.handleChangeTab,
    handleUpdateDevice: inputs.handleUpdateDevice,
    currentTab: outputs.$currentTab,
    individualDevice: outputs.$individualDevice,
    isDeviceLoading: outputs.$isDeviceLoading,
    isDeviceUpdating: outputs.$isDeviceUpdating,
    mountPlaces: outputs.$mountPlaces,
  });

  const apartmentId = individualDevice?.address?.apartmentId;

  useEffect(() => {
    return inputs.updateDeviceSuccess.watch(() => {
      history.goBack();
    }).unsubscribe;
  }, [history, apartmentId]);

  return (
    <>
      <FetchIndividualDeviceGate deviceId={Number(deviceId)} />
      {individualDevice?.address?.apartmentId && (
        <IndividualDeviceMountPlacesGate
          apartmentId={individualDevice?.address?.apartmentId}
        />
      )}
      <AllIndividualDeviceMountPlacesGate />

      <EditIndividualPage
        handleChangeTab={handleChangeTab}
        currentTab={currentTab}
        individualDevice={individualDevice}
        isDeviceLoading={isDeviceLoading}
        handleUpdateDevice={handleUpdateDevice}
        mountPlaces={mountPlaces}
        onCancel={onCancel}
        isDeviceUpdating={isDeviceUpdating}
      />
    </>
  );
};

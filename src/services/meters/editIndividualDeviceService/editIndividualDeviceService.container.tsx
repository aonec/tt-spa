import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { editIndividualDeviceService } from './editIndividualDeviceService.model';
import { EditIndividualPage } from './EditIndividualPage';
import {  useNavigate, useParams } from 'react-router-dom';
import { individualDeviceMountPlacesService } from '../../devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';

const { inputs, outputs, gates } = editIndividualDeviceService;
const { FetchIndividualDeviceGate } = gates;
const { AllIndividualDeviceMountPlacesGate, IndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const EditIndividualDeviceContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const history =  useNavigate();
  const onCancel = () => history(-1);

  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleUpdateDevice = useEvent(inputs.handleUpdateDevice);

  const currentTab = useStore(outputs.$currentTab);
  const individualDevice = useStore(outputs.$individualDevice);
  const isDeviceLoading = useStore(outputs.$isDeviceLoading);
  const isDeviceUpdating = useStore(outputs.$isDeviceUpdating);
  const mountPlaces = useStore(outputs.$mountPlaces);

  const apartmentId = individualDevice?.address?.apartmentId;

  useEffect(() => {
    return inputs.updateDeviceSuccess.watch(() => {
      history(-1);
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

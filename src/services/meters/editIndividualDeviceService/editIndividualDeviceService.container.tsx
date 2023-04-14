import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { editIndividualDeviceService } from './editIndividualDeviceService.model';
import { EditIndividualPage } from './EditIndividualPage';
import { useHistory, useParams } from 'react-router-dom';
import {
  AllIndividualDeviceMountPlacesGate,
  IndividualDeviceMountPlacesGate,
} from '../../../01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';

const { inputs, outputs, gates } = editIndividualDeviceService;
const { FetchIndividualDeviceGate } = gates;

export const EditIndividualDeviceContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const history = useHistory();
  const onCancel = () => history.goBack();

  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleUpdateDevice = useEvent(inputs.handleUpdateDevice);

  const currentTab = useStore(outputs.$currentTab);
  const individualDevice = useStore(outputs.$individualDevice);
  const isDeviceLoading = useStore(outputs.$isDeviceLoading);
  const mountPlaces = useStore(outputs.$mountPlaces);

  const apartmentId = individualDevice?.address?.apartmentId;

  useEffect(() => {
    return inputs.updateDeviceSuccess.watch(() => {
      history.push(`/meters/apartments/${apartmentId}`);
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
      />
    </>
  );
};

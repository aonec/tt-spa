import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckFormValuesModal } from './components/CheckFormValuesModal';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { SwitchIndividualDeviceGate } from './models';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

interface Props {
  type: 'reopen' | 'check' | 'switch';
}
const {
  gates: { IndividualDeviceGate },
} = displayIndividualDeviceAndNamesService;

export const SwitchIndividualDevice: React.FC<Props> = ({ type }) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  return (
    <>
      <SwitchIndividualDeviceGate type={type} />
      <IndividualDeviceGate id={Number(deviceId)} />
      <CheckFormValuesModal />
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <CreateIndividualDeviceForm />
      </Grid>
    </>
  );
};

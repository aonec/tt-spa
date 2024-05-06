import React, { FC, useEffect } from 'react';
import { WorkWithIndividualDeviceContainerProps } from './workWithIndividualDeviceService.types';
import { useParams } from 'react-router';
import { workWithIndividualDeviceService } from './workWithIndividualDeviceService.model';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { WorkWithIndividualDevicePage } from './view/WorkWithIndividualDevicePage';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { getSerialNumberQuery } from './workWithIndividualDeviceService.api';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
import { WorkWithIndividualDeviceSubmitActionContainer } from './workWithIndividualDeviceSubmitActionService';
import { useNavigate } from 'react-router-dom';

const { gates, inputs, outputs } = workWithIndividualDeviceService;
const { WorkWithIndividualDeviceGate, IndividualDeviceGate } = gates;
const { ContractorsGate } = displayContractorsService.gates;

export const WorkWithIndividualDeviceContainer: FC<
  WorkWithIndividualDeviceContainerProps
> = ({ type }) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();

  const {
    individualDevice,
    isDeviceLoading,
    contractors,
    handleFetchSerialNumberForCheck,
    handleFetchModels,
    models,
    handleSubmitForm,
    deviceInfoForm,
  } = useUnit({
    individualDevice: outputs.$individualDevice,
    isDeviceLoading: outputs.$isDeviceLoading,
    contractors: displayContractorsService.outputs.$contractors,
    handleFetchSerialNumberForCheck: inputs.fetchSerialNumberForCheck,
    handleFetchModels:
      displayIndividualDeviceAndNamesService.inputs.handleFetchModels,
    models:
      displayIndividualDeviceAndNamesService.outputs.$individualDevicesNames,
    handleSubmitForm: inputs.handleSubmitForm,
    deviceInfoForm: outputs.$deviceInfoForm,
  });

  const { data: serialNumberForChecking, pending: isSerialNumberLoading } =
    useUnit(getSerialNumberQuery);

  useEffect(() => {
    return inputs.actionSucceed.watch(() => navigate(-1)).unsubscribe;
  }, [navigate]);

  return (
    <>
      <WorkWithIndividualDeviceGate type={type} />
      <IndividualDeviceGate id={Number(deviceId)} />
      <ContractorsGate />
      <WorkWithIndividualDeviceSubmitActionContainer deviceInfoForm={deviceInfoForm} />
      <WithLoader isLoading={isDeviceLoading}>
        <WorkWithIndividualDevicePage
          individualDevice={individualDevice}
          type={type}
          contractors={contractors}
          handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
          handleFetchModels={handleFetchModels}
          serialNumberForChecking={serialNumberForChecking || []}
          isSerialNumberLoading={isSerialNumberLoading}
          models={models}
          onSubmitCapture={inputs.onSubmitCapture}
          handleSubmitForm={handleSubmitForm}
        />
      </WithLoader>
    </>
  );
};

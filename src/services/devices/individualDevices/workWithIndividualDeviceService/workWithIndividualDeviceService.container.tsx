import React, { FC } from 'react';
import { WorkWithIndividualDeviceContainerProps } from './workWithIndividualDeviceService.types';
import { useParams } from 'react-router';
import { workWithIndividualDeviceService } from './workWithIndividualDeviceService.model';
import { useUnit } from 'effector-react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { WorkWithIndividualDevicePage } from './view/WorkWithIndividualDevicePage';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { getSerialNumberQuery } from './workWithIndividualDeviceService.api';

const { gates, inputs, outputs, forms } = workWithIndividualDeviceService;
const { WorkWithIndividualDeviceGate, IndividualDeviceGate } = gates;
const { ContractorsGate } = displayContractorsService.gates;

export const WorkWithIndividualDeviceContainer: FC<
  WorkWithIndividualDeviceContainerProps
> = ({ type }) => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const {
    individualDevice,
    isDeviceLoading,
    contractors,
    handleFetchSerialNumberForCheck,
  } = useUnit({
    individualDevice: outputs.$individualDevice,
    isDeviceLoading: outputs.$isDeviceLoading,
    contractors: displayContractorsService.outputs.$contractors,
    handleFetchSerialNumberForCheck: inputs.fetchSerialNumberForCheck,
  });

  const { data: isSerialNumberAllreadyExist, pending: isSerialNumberLoading } =
    useUnit(getSerialNumberQuery);

  return (
    <>
      <WorkWithIndividualDeviceGate type={type} />
      <IndividualDeviceGate id={Number(deviceId)} />
      <ContractorsGate />
      <WithLoader isLoading={isDeviceLoading}>
        <WorkWithIndividualDevicePage
          individualDevice={individualDevice}
          type={type}
          form={forms.deviceInfoForm}
          contractors={contractors}
          handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
          isSerialNumberAllreadyExist={isSerialNumberAllreadyExist || false}
          isSerialNumberLoading={isSerialNumberLoading}
        />
      </WithLoader>
    </>
  );
};

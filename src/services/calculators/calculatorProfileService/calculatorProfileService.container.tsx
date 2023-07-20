import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import {
  CheckCalculatorContainer,
  checkCalculatorService,
} from '../checkCalculatorService';
import {
  CloseCalculatorContainer,
  closeCalculatorService,
} from '../closeCalculatorService';
import { CalculatorProfile } from './CalculatorProfile/CalculatorProfile';
import { calculatorProfileService } from './calculatorProfileService.model';
import { ConsumptionReportCalculatorContainer } from '../consumptionReportCalculatorService';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

const { gates, inputs, outputs } = calculatorProfileService;
const { CalculatorIdGate } = gates;

export const CalculatorProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const isLoading = useStore(outputs.$isLoading);
  const calculator = useStore(outputs.$calculator);
  const currentGrouptype = useStore(outputs.$currentCalculatorGrouptype);

  const setGrouptype = useEvent(inputs.setCalculatorGrouptype);
  const handleOpenCloseCalculatorModal = useEvent(
    closeCalculatorService.inputs.openModal,
  );
  const handleOpenCheckCalculatorModal = useEvent(
    checkCalculatorService.inputs.openModal,
  );
  const handleOpenConsumptionReportModal = useEvent(
    inputs.handleConsumptionReportModalOpen,
  );
  const openDevicesListModal = useEvent(inputs.openDevicesListModal);

  const isPermitionToCalculatorActions = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);

  return (
    <>
      <CalculatorIdGate id={Number(deviceId)} />
      <CheckCalculatorContainer />
      <CloseCalculatorContainer />
      <ConsumptionReportCalculatorContainer calculator={calculator} />
      <WithLoader isLoading={isLoading}>
        {calculator && (
          <CalculatorProfile
            calculator={calculator}
            currentGrouptype={currentGrouptype}
            setGrouptype={setGrouptype}
            handleOpenCloseCalculatorModal={handleOpenCloseCalculatorModal}
            handleOpenCheckCalculatorModal={handleOpenCheckCalculatorModal}
            handleOpenConsumptionReportModal={() =>
              handleOpenConsumptionReportModal()
            }
            openDevicesListModal={openDevicesListModal}
            isPermitionToCalculatorActions={isPermitionToCalculatorActions}
          />
        )}
      </WithLoader>
    </>
  );
};

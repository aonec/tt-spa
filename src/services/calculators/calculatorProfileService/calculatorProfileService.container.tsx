import { useEvent, useStore } from 'effector-react';
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
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
import { CalculatorProfileGrouptype } from './calculatorProfileService.constants';

const { gates, inputs, outputs } = calculatorProfileService;
const { CalculatorIdGate } = gates;

export const CalculatorProfileContainer = () => {
  const { deviceId, section } = useParams<{
    deviceId: string;
    section?: CalculatorProfileGrouptype;
  }>();
  const history = useHistory();

  const isLoading = useStore(outputs.$isLoading);
  const calculator = useStore(outputs.$calculator);

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

  const setGrouptype = useCallback(
    (section: CalculatorProfileGrouptype) =>
      history.replace(`/calculators/${deviceId}/profile/${section}`),
    [history, deviceId],
  );

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
            currentGrouptype={section}
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

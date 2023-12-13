import React, { useEffect } from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import { MeteringDeviceResponse } from 'api/types';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorInfosGate, SaveDeviceIdGate } = gates;

export const EditCalculatorContainer = () => {
  const {
    calculator,
    calculatorTypesSelectItems,
    currentTab,
    handleChangeTab,
    handleCloseModal,
    handleFecthCalculator,
    handleSubmit,
    isCalculatorLoading,
    isModalOpen,
    sameConnectionCalculator,
  } = useUnit({
    handleChangeTab: inputs.handleChangeTab,
    handleSubmit: inputs.handleSubmit,
    handleCloseModal: inputs.handleCloseModal,
    handleFecthCalculator: inputs.handleFecthCalculator,
    currentTab: outputs.$currentTab,
    calculator: outputs.$calculator,
    isCalculatorLoading: outputs.$isLoading,
    sameConnectionCalculator: outputs.$sameConnectionCalculator,
    isModalOpen: outputs.$isModalOpen,
    calculatorTypesSelectItems: outputs.$calculatorTypesSelectItems,
  });

  const { deviceId } = useParams<{ deviceId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    return inputs.editCalculatorSuccess.watch(
      (data: MeteringDeviceResponse | null) => {
        if (data?.id) {
          navigate(`/calculators/${data.id}/profile`);
        }
      },
    ).unsubscribe;
  }, [navigate]);

  useEffect(() => {
    handleFecthCalculator(Number(deviceId));
  }, [deviceId, handleFecthCalculator]);

  return (
    <>
      <SaveDeviceIdGate deviceId={Number(deviceId)} />
      <CalculatorInfosGate />
      <EditCalculatorPage
        calculator={calculator}
        currentTab={currentTab}
        handleChangeTab={handleChangeTab}
        calculatorTypesSelectItems={calculatorTypesSelectItems}
        handleSubmit={handleSubmit}
        isCalculatorLoading={isCalculatorLoading}
        sameConnectionCalculator={sameConnectionCalculator}
        handleCloseModal={() => handleCloseModal()}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

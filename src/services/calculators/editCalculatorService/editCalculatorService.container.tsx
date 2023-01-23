import React, { useEffect } from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { MeteringDeviceResponse } from 'myApi';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorIdGate, CalculatorInfosGate, SaveDeviceIdGate } = gates;

export const EditCalculatorContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleSubmit = useEvent(inputs.handleSubmit);
  const handleCloseModal = useEvent(inputs.handleCloseModal);
  const clearCalculatorStore = useEvent(inputs.clearCalculatorStore);
  const handleFecthCalculator = useEvent(inputs.handleFecthCalculator);

  const currentTab = useStore(outputs.$currentTab);
  const calculator = useStore(outputs.$calculator);
  const isCalculatorLoading = useStore(outputs.$isLoading);
  const sameConnectionCalculator = useStore(outputs.$sameConnectionCalculator);
  const isModalOpen = useStore(outputs.$isModalOpen);

  const { deviceId } = useParams<{ deviceId: string }>();

  const history = useHistory();

  const calculatorTypesSelectItems = useStore(
    outputs.$calculatorTypesSelectItems
  );

  useEffect(() => {
    return inputs.editCalculatorSuccess.watch(
      (data: MeteringDeviceResponse | null) => {
        if (data?.id) {
          history.push(`/calculators/${data.id}`);
        }
      }
    ).unsubscribe;
  }, []);

  useEffect(() => {
    handleFecthCalculator(Number(deviceId));
  }, [deviceId]);

  return (
    <>
      <CalculatorIdGate id={Number(deviceId)} />
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
        clearCalculatorStore={() => clearCalculatorStore()}
      />
    </>
  );
};

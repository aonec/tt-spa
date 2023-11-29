import React, { useEffect } from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useEvent, useStore } from 'effector-react';
import {  useNavigate, useParams } from 'react-router-dom';
import { MeteringDeviceResponse } from 'api/types';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorInfosGate, SaveDeviceIdGate } = gates;

export const EditCalculatorContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleSubmit = useEvent(inputs.handleSubmit);
  const handleCloseModal = useEvent(inputs.handleCloseModal);
  const handleFecthCalculator = useEvent(inputs.handleFecthCalculator);

  const currentTab = useStore(outputs.$currentTab);
  const calculator = useStore(outputs.$calculator);
  const isCalculatorLoading = useStore(outputs.$isLoading);
  const sameConnectionCalculator = useStore(outputs.$sameConnectionCalculator);
  const isModalOpen = useStore(outputs.$isModalOpen);

  const { deviceId } = useParams<{ deviceId: string }>();

  const history =  useNavigate();

  const calculatorTypesSelectItems = useStore(
    outputs.$calculatorTypesSelectItems,
  );

  useEffect(() => {
    return inputs.editCalculatorSuccess.watch(
      (data: MeteringDeviceResponse | null) => {
        if (data?.id) {
           history(`/calculators/${data.id}/profile`);
        }
      },
    ).unsubscribe;
  }, [history]);

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

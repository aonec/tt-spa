import React, { useEffect } from 'react';
import { EditCalculatorPage } from './view/EditCalculatorPage';
import { editCalculatorService } from './editCalculatorService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';

const { inputs, outputs, gates } = editCalculatorService;
const { CalculatorIdGate, CalculatorInfosGate, SaveDeviceIdGate } = gates;

export const EditCalculatorContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleSubmit = useEvent(inputs.handleSubmit);

  const currentTab = useStore(outputs.$currentTab);
  const calculator = useStore(outputs.$calculator);

  const { deviceId } = useParams<{ deviceId: string }>();

  const history = useHistory();

  const calculatorTypesSelectItems = useStore(
    outputs.$calculatorTypesSelectItems
  );

  useEffect(() => {
    return inputs.editCalculatorSuccess.watch((data) => {
      if (data?.id) {
        history.push(`/calculators/${data.id}`);
      }
    }).unsubscribe;
  }, []);

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
      />
    </>
  );
};

import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { CalculatorProfile } from './CalculatorProfile/CalculatorProfile';
import { calculatorProfileService } from './calculatorProfileService.model';

const { gates, inputs, outputs } = calculatorProfileService;
const { CalculatorIdGate } = gates;

export const CalculatorProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const isLoading = useStore(outputs.$isLoading);
  const calculator = useStore(outputs.$calculator);
  const currentGrouptype = useStore(outputs.$currentCalculatorGrouptype);

  const setGrouptype = useEvent(inputs.setCalculatorGrouptype);

  return (
    <>
      <CalculatorIdGate id={Number(deviceId)} />
      <WithLoader isLoading={isLoading}>
        {calculator && (
          <CalculatorProfile
            calculator={calculator}
            currentGrouptype={currentGrouptype}
            setGrouptype={setGrouptype}
          />
        )}
      </WithLoader>
    </>
  );
};

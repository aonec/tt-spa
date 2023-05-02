import React from 'react';
import { StandartWorkingRange } from './view/StandartWorkingRange';
import { standartWorkingRangeService } from './standartWorkingRangeService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = standartWorkingRangeService;

export const StandartWorkingRangeContainer = () => {
  const standartWorkingRange = useStore(outputs.$standartWorkingRange);
  const isLoading = useStore(outputs.$isLoading);

  const handleOnSearchDataChange = useEvent(inputs.handleOnSearchDataChange);

  return (
    <>
      <StandartWorkingRange
        standartWorkingRange={standartWorkingRange}
        handleOnSearchDataChange={handleOnSearchDataChange}
        isLoading={isLoading}
      />
    </>
  );
};

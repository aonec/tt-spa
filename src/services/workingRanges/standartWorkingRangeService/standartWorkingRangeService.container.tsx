import React from 'react';
import { StandartWorkingRange } from './view/StandartWorkingRange';
import { standartWorkingRangeService } from './standartWorkingRangeService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = standartWorkingRangeService;

export const StandartWorkingRangeContainer = () => {
  const { handleOnSearchDataChange, isLoading, standartWorkingRange } = useUnit(
    {
      standartWorkingRange: outputs.$standartWorkingRange,
      isLoading: outputs.$isLoading,
      handleOnSearchDataChange: inputs.handleOnSearchDataChange,
    },
  );

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

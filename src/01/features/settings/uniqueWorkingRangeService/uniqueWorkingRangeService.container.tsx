import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { uniqueWorkingRangeService } from './uniqueWorkingRangeService.model';
import { UniqueWorkingRange } from './view/UniqueWorkingRange/UniqueWorkingRange';

const { inputs, outputs } = uniqueWorkingRangeService;

export const UniqueWorkingRangeContainer = () => {
  const housingStockUniqueWorkingRange = useStore(
    outputs.$housingStockUniqueWorkingRange
  );
  const isLoading = useStore(outputs.$isLoading);

  const handleOnSearchDataChange = useEvent(inputs.handleOnSearchDataChange);

  return (
    <>
      <UniqueWorkingRange
        housingStockUniqueWorkingRange={housingStockUniqueWorkingRange}
        isLoading={isLoading}
        handleOnSearchDataChange={handleOnSearchDataChange}
      />
    </>
  );
};

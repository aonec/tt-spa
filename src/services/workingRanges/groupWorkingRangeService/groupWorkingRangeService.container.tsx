import { useUnit } from 'effector-react';
import React from 'react';
import { groupWorkingRangeService } from './groupWorkingRangeService.model';
import { GroupWorkingRange } from './view/GroupWorkingRange';

const { inputs, outputs, gates } = groupWorkingRangeService;
const { GroupWorkingRangeGate } = gates;

export const GroupWorkingRangeContainer = () => {
  const {
    groupWorkingRange,
    handleOnSearchDataChange,
    houseManagements,
    isLoading,
  } = useUnit({
    groupWorkingRange: outputs.$groupWorkingRange,
    isLoading: outputs.$isLoading,
    houseManagements: outputs.$houseManagements,
    handleOnSearchDataChange: inputs.handleOnSearchDataChange,
  });

  return (
    <>
      <GroupWorkingRangeGate />
      <GroupWorkingRange
        groupWorkingRange={groupWorkingRange}
        handleOnSearchDataChange={handleOnSearchDataChange}
        isLoading={isLoading}
        houseManagements={houseManagements}
      />
    </>
  );
};

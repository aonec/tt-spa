import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { groupWorkingRangeService } from './groupWorkingRangeService.model';
import { GroupWorkingRange } from './view/GroupWorkingRange';

const { inputs, outputs, gates } = groupWorkingRangeService;
const { GroupWorkingRangeGate } = gates;

export const GroupWorkingRangeContainer = () => {
  const groupWorkingRange = useStore(outputs.$groupWorkingRange);
  const isLoading = useStore(outputs.$isLoading);
  const houseManagements = useStore(outputs.$houseManagements);

  const handleOnSearchDataChange = useEvent(inputs.handleOnSearchDataChange);

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

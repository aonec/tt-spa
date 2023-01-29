import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { groupWorkingRangeService } from './groupWorkingRangeService.model';
import { GroupWorkingRange } from './view/GroupWorkingRange';

const { inputs, outputs } = groupWorkingRangeService;

export const GroupWorkingRangeContainer = () => {
  const groupWorkingRange = useStore(outputs.$groupWorkingRange);
  const isLoading = useStore(outputs.$isLoading);

  const handleOnSearchDataChange = useEvent(inputs.handleOnSearchDataChange);

  return (
    <>
      <GroupWorkingRange
        groupWorkingRange={groupWorkingRange}
        handleOnSearchDataChange={handleOnSearchDataChange}
        isLoading={isLoading}
      />
    </>
  );
};

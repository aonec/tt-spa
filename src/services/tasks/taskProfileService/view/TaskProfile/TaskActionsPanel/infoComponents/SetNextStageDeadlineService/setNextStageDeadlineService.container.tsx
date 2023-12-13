import { useUnit } from 'effector-react';
import React from 'react';
import { SetNextStageDeadline } from './components/SetNextStageDeadline';
import { setNextStageDeadlineService } from './setNextStageDeadlineService.models';

export const IndividualDeviceCheckInfoContainer = () => {
  const { deniedPermissionsCount } = useUnit({
    deniedPermissionsCount:
      setNextStageDeadlineService.outputs.$deniedPermissionsCount,
  });

  return (
    <SetNextStageDeadline deniedPermissionsCount={deniedPermissionsCount} />
  );
};

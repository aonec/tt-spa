import { useGate, useStore } from 'effector-react';
import React from 'react';
import { resourceDisablingScheduleServiceService } from './ResourceDisablingScheduleService.model';
import { DisablingResourceWrapper } from './views/DisablingResoucesList.styles';
import { DisablingResourcesList } from './views/DisablingResoursesList';

export const ResourceDisablingScheduleContainer = () => {
  const DisablingResouresGate =
    resourceDisablingScheduleServiceService.gates.resourceDisablingGate;
  const resources = useStore(
    resourceDisablingScheduleServiceService.outputs.$disablingResources
  );
  const loading = useStore(
    resourceDisablingScheduleServiceService.outputs.$loading
  );

  return (
    <DisablingResourceWrapper>
      <DisablingResouresGate />
      <DisablingResourcesList resources={resources} loading={loading} />
    </DisablingResourceWrapper>
  );
};

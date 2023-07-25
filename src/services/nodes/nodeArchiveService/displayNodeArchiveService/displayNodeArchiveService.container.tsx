import { useUnit } from 'effector-react';
import React from 'react';
import { displayNodeArchiveService } from './displayNodeArchiveService.models';
import { NodeArchiveList } from './view/NodeArchiveList';
import './displayNodeArchiveService.relations';
import { WithLoader } from 'ui-kit/shared/WithLoader';

const { inputs, outputs } = displayNodeArchiveService;
const { NodeArchiveGate } = displayNodeArchiveService.inputs;

export const NodeArchiveContainer = () => {
  const nodeArchiveData = useUnit(outputs.$preparedReadings);
  const loading = useUnit(outputs.$loading);
  const withFaultReadings = useUnit(outputs.$withFaultReadings);

  const setWithFaultReadings = useUnit(inputs.setWithFaultReadings);

  return (
    <>
      <NodeArchiveGate />
      <WithLoader isLoading={loading}>
        <NodeArchiveList
          data={nodeArchiveData}
          withFaultReadings={withFaultReadings}
          setWithFaultReadings={setWithFaultReadings}
        />
      </WithLoader>
    </>
  );
};

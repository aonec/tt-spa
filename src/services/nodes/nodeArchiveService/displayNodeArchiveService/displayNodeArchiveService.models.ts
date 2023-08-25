import { combine, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { getNodeArchiveData } from './displayNodeArchiveService.api';
import {
  GetNodeArchiveDataRequestParams,
  LoadNodeArchiveDataPayload,
  NodeArchiveData,
  NodeArchivePreparedDataRow,
} from './displayNodeArchiveService.types';
import { nodeProfileService } from 'services/nodes/nodeProfileService';
import _ from 'lodash';

const domain = createDomain('displayNodeArchiveService');

const NodeArchiveGate = createGate();

const $nodeArchiveData = domain.createStore<NodeArchiveData | null>(null);

const fetchNodeArchiveDataFx = domain.createEffect<
  GetNodeArchiveDataRequestParams,
  NodeArchiveData
>(getNodeArchiveData);

const loadNodeArchiveData = domain.createEvent<LoadNodeArchiveDataPayload>();

const setWithFaultReadings = domain.createEvent<boolean>();
const $withFaultReadings = domain
  .createStore(false)
  .on(setWithFaultReadings, (_, withFaultReadings) => withFaultReadings)
  .reset(NodeArchiveGate.close);

const $preparedReadings = combine(
  $nodeArchiveData,
  $withFaultReadings,
  (data, withFaultReadings) => {
    if (!data) {
      return null;
    }
    const preparedRows = data.rows.reduce((acc, reading) => {
      const isFault = _.last(reading.values)?.text === '*';

      if (!withFaultReadings && isFault) {
        return acc;
      }
      return [...acc, { ...reading, isFault }];
    }, [] as NodeArchivePreparedDataRow[]);

    return { ...data, rows: preparedRows };
  },
);

const $loading = fetchNodeArchiveDataFx.pending;

export const displayNodeArchiveService = {
  inputs: {
    fetchNodeArchiveDataFx,
    loadNodeArchiveData,
    NodeArchiveGate,
    setWithFaultReadings,
  },
  outputs: {
    $nodeArchiveData,
    $preparedReadings,
    $loading,
    $node: nodeProfileService.outputs.$pipeNode,
    $nodeId: nodeProfileService.gates.PipeNodeGate.state.map(
      ({ pipeNodeId }) => pipeNodeId,
    ),
    $withFaultReadings,
  },
};

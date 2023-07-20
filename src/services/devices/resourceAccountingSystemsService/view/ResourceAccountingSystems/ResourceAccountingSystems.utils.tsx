import _ from 'lodash';
import { NodeOnHousingStockResponse } from 'api/types';
import { NO_CALCULATOR_KEY } from './ResourceAccountingSystems.constants';
import { ResourceAccountingSystemsSegment } from './ResourceAccountingSystems.types';

export function getNodesGroups(
  nodes: NodeOnHousingStockResponse[],
  segmentName: ResourceAccountingSystemsSegment,
): [string, NodeOnHousingStockResponse[]][] {
  return Object.entries(
    _.groupBy(nodes, (node) =>
      segmentName === 'resource'
        ? node.resource
        : node.networkDevice?.id || NO_CALCULATOR_KEY,
    ),
  );
}

import _ from 'lodash';
import { NodeOnHousingStockResponse } from 'myApi';
import {
  NO_CALCULATOR_KEY,
  ResourcesPriorityDictionary,
} from './ResourceAccountingSystems.constants';
import { ResourceAccountingSystemsSegment } from './ResourceAccountingSystems.types';

export function getNodesGroups(
  nodes: NodeOnHousingStockResponse[],
  segmentName: ResourceAccountingSystemsSegment
): [string, NodeOnHousingStockResponse[]][] {
  return Object.entries(
    _.groupBy(nodes, (node) =>
      segmentName === 'resource'
        ? node.resource
        : node.networkDevice?.id || NO_CALCULATOR_KEY
    )
  ).map(([key, value]) => [
    key,
    value.sort((a, b) => {
      const aPriorityScore = ResourcesPriorityDictionary[a.resource];
      const bPriorityScore = ResourcesPriorityDictionary[b.resource];

      if (aPriorityScore < bPriorityScore) {
        return -1;
      }
      if (aPriorityScore > bPriorityScore) {
        return 1;
      }

      return 0;
    }),
  ]);
}

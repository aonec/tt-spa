import { NodeOnHousingStockResponse } from 'myApi';
import { ResourcesPriorityDictionary } from './view/ResourceAccountingSystems/ResourceAccountingSystems.constants';

export function sortNodes(nodes: NodeOnHousingStockResponse[]) {
  return nodes.sort((a, b) => {
    const aPriorityScore = ResourcesPriorityDictionary[a.resource];
    const bPriorityScore = ResourcesPriorityDictionary[b.resource];

    if (aPriorityScore < bPriorityScore) {
      return -1;
    }

    if (aPriorityScore > bPriorityScore) {
      return 1;
    }

    return 0;
  });
}

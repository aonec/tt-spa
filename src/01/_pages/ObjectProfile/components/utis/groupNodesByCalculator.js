/* eslint-disable */

import _ from 'lodash';

export const groupNodesByCalculator = (nodes) => {
  const nodesById = _.groupBy(nodes, 'calculatorId');

  const calculators = _.map(nodesById, (value) => ({
    ...value[0].calculator,
    nodes: value,
  }));

  return calculators;
};

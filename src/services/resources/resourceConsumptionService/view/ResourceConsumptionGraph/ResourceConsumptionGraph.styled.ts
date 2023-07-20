import { EResourceType } from 'api/myApi';
import styled from 'styled-components';
import { GraphColorLookup } from 'utils/Graph.utils';

export const Wrapper = styled.div`
  svg {
    overflow: visible !important;
  }

  padding-bottom: 48px;
`;

export const getCurrentDataStyle = (resource: EResourceType) => ({
  parent: { overflow: 'visible' },
  data: {
    fill: `url(#${resource})`,
    stroke: GraphColorLookup[resource],
    strokeWidth: 2,
  },
});

export const ZeroLineStyle = {
  data: {
    stroke: '#dcdee4',
    strokeWidth: 2,
  },
  labels: {
    fill: '#272F5AB2',
  },
};

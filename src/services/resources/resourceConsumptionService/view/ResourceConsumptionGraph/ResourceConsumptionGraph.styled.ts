import { EResourceType } from 'api/types';
import styled from 'styled-components';
import { GraphColorLookup } from 'utils/Graph.utils';

export const Wrapper = styled.div<{ isLoading?: boolean }>`
  svg {
    overflow: visible !important;
  }

  margin-bottom: 36px;
  opacity: ${({ isLoading }) => (isLoading ? '0.5' : '1')};
`;

export const AlertWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 10px;
`;

export const AlertTitle = styled.div`
  line-height: 30px;
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

import { getResourceColor } from '01/utils/getResourceColor';
import { EResourceType } from 'myApi';
import styled from 'styled-components';

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
    stroke: getResourceColor(resource),
    strokeWidth: 2,
  },
});

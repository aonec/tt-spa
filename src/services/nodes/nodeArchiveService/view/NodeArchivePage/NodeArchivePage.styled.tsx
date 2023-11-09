import { PageHeader } from 'ui-kit/shared/PageHeader';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 20px;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const StickyWrapper = styled.div`
  position: sticky;
  top: 0px;
  background-color: #fff;
  padding-bottom: 17px;
  padding-top: 16px;
`;

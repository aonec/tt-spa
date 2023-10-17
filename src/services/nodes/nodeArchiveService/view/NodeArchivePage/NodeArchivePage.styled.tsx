import { PageHeader } from 'ui-kit/shared/PageHeader';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
`;

export const FiltersWrap = styled.div`
  position: fixed;
  top: 130px;
  left: 1050px;
  background-color: #fff;
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

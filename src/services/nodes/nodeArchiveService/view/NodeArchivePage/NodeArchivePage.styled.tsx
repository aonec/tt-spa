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
  top: 16px;
  background-color: #fff;
  padding-bottom: 17px;
`;

export const MaxWidth = styled.div`
  max-width: 300px;
  width: 300px;
  overflow: hidden;
`;

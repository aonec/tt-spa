import { PageHeader } from 'ui-kit/sharedComponents/PageHeader';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 900px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1.5fr;
  grid-gap: 45px;

  margin-top: 16px;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const BlockTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  user-select: none;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

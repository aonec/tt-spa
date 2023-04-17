import { PageHeader } from '01/shared/ui/PageHeader';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 16px;
  display: grid;
  width: 1000px;
  grid-template-columns: 1fr 0.5fr;
  grid-gap: 32px;
`;

export const Footer = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const AddressWrapper = styled.div`
  color: #272f5ae5;
  font-weight: 500;
  font-size: 14px;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

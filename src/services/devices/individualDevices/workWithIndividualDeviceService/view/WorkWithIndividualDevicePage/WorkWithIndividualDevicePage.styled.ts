import styled from 'styled-components';
import { PageHeader } from 'ui-kit/sharedComponents/PageHeader';

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const DeviceInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SerialNumberWrapper = styled.span`
  font-weight: 500;
`;

export const ModelWrapper = styled.span`
  color: #272f5ab2;
`;

export const ContentWrapper = styled.div`
  margin-top: 16px;
  max-width: 800px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  margin-top: 24px;
`;

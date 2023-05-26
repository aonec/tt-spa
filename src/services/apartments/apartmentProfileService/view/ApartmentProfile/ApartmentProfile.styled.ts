import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import styled from 'styled-components';

export const HeaderInfo = styled.div`
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`;

export const AdditionalAddressWrapper = styled.span`
  margin-left: 10px;
  font-weight: 400;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const TabsWrapper = styled.div`
  margin-top: 15px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const BaseContentWrapper = styled.div`
  min-width: 900px;
`;

export const CommonInfoWrapper = styled.div`
  max-width: 716px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Deviceswrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  max-width: 860px;
`;

export const CardsWrapper = styled.div`
  width: 312px;
`;

import { PageHeader } from '01/shared/ui/PageHeader';
import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';
import { IncorrectConfigurationIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  width: 816px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AdditionalAddress = styled.span`
  font-weight: 400;
  margin-left: 6px;
`;

export const HeaderInfoStringWrapper = styled.div`
  margin-top: -5px;
`;

export const IncorrectConfigurationIconSC = styled(IncorrectConfigurationIcon)`
  transform: scale(1.6);
  margin-left: 12px;
`;

export const NodeNumberWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
`;

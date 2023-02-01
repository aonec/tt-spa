import styled from 'styled-components';
import { IncorrectConfigurationIcon } from 'ui-kit/icons';

export const TabsWrapper = styled.div`
  margin-top: 16px;
`;

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

export const HeaderWrapper = styled.div`
  padding: 25px 0 5px;
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

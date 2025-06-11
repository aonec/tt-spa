import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Footer = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
`;

export const ButtonPadding = styled.div`
  padding: 0 20px;
`;

export const RightButtonBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  color: #272f5a;
`;

export const Subtitle = styled.div`
  margin-left: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const WrapperLinkButton = styled.div`
  width: max-content;
  margin-top: 45px;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

export const HouseManagementWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
`;

import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div``;

export const Footer = styled.div`
  display: flex;
  margin-top: 20px;
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

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

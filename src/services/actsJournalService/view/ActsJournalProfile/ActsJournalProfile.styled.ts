import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

const pageWidth = 1080;

export const Wrapper = styled.div`
  max-width: ${pageWidth}px;
  margin-top: 16px;
`;

export const HeaderWrapper = styled.div`
  max-width: ${pageWidth}px;

  display: grid;
  grid-template-columns: 1fr 0.1fr;
`;

export const ButtonSC = styled(Button)`
  margin-left: 15px;
`;

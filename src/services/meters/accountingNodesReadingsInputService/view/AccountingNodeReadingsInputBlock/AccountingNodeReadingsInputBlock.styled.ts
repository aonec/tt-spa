import styled from 'styled-components';
import { Wrapper } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';

export const ReadingDate = styled.div`
  line-height: 0;
  margin-top: 12px;
  text-align: right;
  color: rgba(39, 47, 90, 0.5);
`;

export const InputBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const WrapperSC = styled(Wrapper)`
  max-width: none;
`;

import styled from 'styled-components';
import { FormItem } from 'ui-kit/FormItem';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-gap: 16px;
`;

export const FormItemSC = styled(FormItem)`
  width: 100%;
`;

export const SelectColorOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorCircle = styled.div<{
  fillColor: string;
  strokeColor: string;
}>`
  width: 12px;
  height: 12px;
  border-radius: 9px;
  background: ${({ fillColor }) => fillColor};
  border: 2px solid ${({ strokeColor }) => strokeColor};
`;

import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';

export const RangePicker = styled(DatePicker.RangePicker)<{ small?: boolean }>`
  border-radius: 4px;
  width: 100%;

  height: ${({ small }) => (small ? '32px' : '48px')};
`;

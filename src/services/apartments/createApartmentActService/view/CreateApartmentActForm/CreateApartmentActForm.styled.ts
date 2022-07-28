import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) !important;
  grid-column-gap: 16px;
`;

export const ErrorMessage = styled.div`
  margin: 5px 0 5px;
  color: red;
`;

export const SelectSC = styled.div`
  max-width: 172px;
  overflow: hidden;
`;

export const DatePickerSC = styled(DatePicker)`
  width: auto !important;
`;

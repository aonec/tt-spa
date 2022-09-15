import { InputSC, SelectSC } from '01/shared/ui/Fields';
import styled from 'styled-components';

export const SearchFieldsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectCitySC = styled(SelectSC)`
  width: 200px;
`;

export const PersonalNumberInput = styled(InputSC)`
  margin-left: 15px;
  margin-right: 0px !important;
  max-width: 1000px;
`;

import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';

export const SearchFieldsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectCitySC = styled(Select)`
  width: 200px;
`;

export const OptionSC = styled(Select.Option)``;

export const PersonalNumberInput = styled(Input)`
  margin-left: 15px;
  margin-right: 0px !important;
  max-width: 1000px;
`;

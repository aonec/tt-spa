import styled from 'styled-components';
import { StyledInput } from '01/shared/ui/Fields';

export const Wrapper = styled.div`
  padding-right: 18px;
  margin-bottom: 15px;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 150px;
`;

export const SearchInput = styled(StyledInput)`
  margin-left: 15px;
  width: 100%;
`;

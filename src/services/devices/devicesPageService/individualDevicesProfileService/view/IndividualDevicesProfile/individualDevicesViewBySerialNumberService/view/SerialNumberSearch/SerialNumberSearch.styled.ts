import { Checkbox } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 15px;
  overflow: visible;
`;

export const SearchFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 1fr 2fr 2.5fr;

  grid-column-gap: 16px;
  align-items: flex-start;
`;

export const CheckboxSC = styled(Checkbox)`
  color: #272f5ae5;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  align-items: center;

  align-self: center;
`;

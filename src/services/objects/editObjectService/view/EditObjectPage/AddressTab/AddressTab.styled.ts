import styled from 'styled-components';
import { AutoComplete } from 'ui-kit/AutoComplete';

export const Wrapper = styled.div`
  width: 480px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const NextCancelBlock = styled.div`
  display: flex;
`;

export const ButtonPadding = styled.div`
  padding: 0 20px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;

export const ItemGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px 12px;
`;

export const NonUserSelect = styled.div`
  user-select: none;
  margin: 12px 0px;
`;

export const AddButtonWrapper = styled.div`
  margin-top: 14px;
  cursor: pointer;
  width: max-content;
`;

export const DeleteButton = styled.div<{ isLoading: boolean }>`
  margin-top: 4px;
  color: red;
  width: max-content;
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'pointer')};
`;

export const BlockTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  user-select: none;
`;

export const AutoCompleteSc = styled(AutoComplete)`
  font-size: 16px;
`;

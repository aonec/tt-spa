import styled from 'styled-components';
import { Button } from 'ui-kit/Button';

export const Wrapper = styled.div``;

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

export const DeleteButton = styled.div`
  margin-top: 4px;
  cursor: pointer;
  color: red;
  width: max-content;
`;

export const ButtonSC = styled(Button)`
  padding: 0 40px;
`;

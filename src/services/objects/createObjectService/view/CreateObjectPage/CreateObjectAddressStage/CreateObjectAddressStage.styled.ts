import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  position: relative;
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

export const AddButton = styled.div`
  margin-top: 24px;
  cursor: pointer;
  position: absolute;
`;

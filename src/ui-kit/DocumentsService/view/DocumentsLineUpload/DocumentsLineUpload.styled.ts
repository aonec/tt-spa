import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const DocumentsListWrapper = styled.div`
  margin-left: 15px;
  display: flex;
`;

export const DocumentsListElement = styled.div`
  margin-left: 15px;

  &:first-child {
    margin-left: 0;
  }
`;

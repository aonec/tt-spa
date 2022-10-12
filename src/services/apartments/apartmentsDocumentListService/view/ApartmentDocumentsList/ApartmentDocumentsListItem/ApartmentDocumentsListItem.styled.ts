import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 5fr;
  grid-column-gap: 15px;

  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;

export const DateWrapper = styled.div`
  color: rgb(39, 47, 90);
  font-weight: 500;
`;

export const DocumentIdWrapper = styled.div`
  color: #272f5ae5;
`;

export const DocumentNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DocumentNameText = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 240px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 8px;
  color: #272f5a;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  &:hover {
    svg {
      path {
        fill: #189ee9;
      }
    }
  }
`;

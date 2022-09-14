import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-right: 15px;
  display: flex;
`;

export const DocumentsListWrapper = styled.div`
  margin-left: 15px;
  height: 42px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const DocumentsListElement = styled.div`
  margin-left: 15px;
  transition: 0.2s;
  cursor: pointer;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: #189ee9;
  }
`;

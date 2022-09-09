import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 64px;
  width: 100%;
  margin-top: 8px;
  padding: 16px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16);
  &:first-child {
    margin-top: 16px;
  }
`;

export const InfoWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2.7fr 1.5fr 1fr;
  grid-column-gap: 8px;
  cursor: pointer;
  flex-grow: 1;

  &:hover {
    .fileName {
      color: #189ee9;
    }
  }
`;

export const FileNameWrapper = styled.div`
  margin-left: 8px;
  color: #272f5a;
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 350px;
`;

export const TrashIconWrapper = styled.div`
  margin-left: 16px;
  &:hover {
    path {
      fill: #fc525b;
    }
  }
`;

export const AuthorWrapper = styled.div`
  margin-left: 8px;
  color: #272f5ab2;

  font-size: 14px;
`;

export const DateWrapper = styled.div`
  margin-left: 8px;
  color: #272f5a;
  font-size: 14px;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

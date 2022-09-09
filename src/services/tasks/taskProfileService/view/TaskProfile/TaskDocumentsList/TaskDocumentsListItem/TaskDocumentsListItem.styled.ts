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
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
`;

export const FileNameWrapper = styled.div`
  margin-left: 8px;
  color: #272f5a;
  font-weight: 500;
  font-size: 14px;
`;

export const TrashIconWrapper = styled.div`
  &:hover {
    path {
      fill: #fc525b;
    }
  }
`;

export const AuthowWrapper = styled.div`
  margin-left: 8px;
  color: #272f5a;
  font-size: 14px;
`;

export const DateWrapper = styled.div`
  margin-left: 8px;
  color: #272f5a;
  font-size: 14px;
`;

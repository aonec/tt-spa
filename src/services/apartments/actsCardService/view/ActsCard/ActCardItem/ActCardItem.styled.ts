import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdee4;
  width: 100%;
`;

export const NumberWrapper = styled.div`
  color: #272f5ab2;
  font-size: 12px;

  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ActWrapper = styled.div`
  color: #272f5a;
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;

  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const BottomInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

export const LinkWrapper = styled.div`
  color: #189ee9;
  cursor: pointer;
`;

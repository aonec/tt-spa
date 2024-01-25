import styled from 'styled-components';

export const Footer = styled.div`
  position: absolute;
  width: 206px;
  bottom: 16px;
  padding: 16px 16px 0;
  border-top: 1px solid #dcdee4;
`;

export const ExitButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MenuItemWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 180px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DevSettingsButton = styled.div`
  border: 1px solid #e5e5e5;
  height: 26px;
  border-radius: 50px;
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export const UserGuideLink = styled.a`
  margin-top: 12px;
  display: block;
  color: #272f5ab2;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  transition: 0.2s;

  &:hover {
    color: rgb(24, 158, 233);
  }
`;

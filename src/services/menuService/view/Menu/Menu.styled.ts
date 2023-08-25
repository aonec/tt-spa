import styled from 'styled-components';

export const Footer = styled.div`
  position: absolute;
  width: 206px;
  bottom: 16px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
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

import styled from 'styled-components';

export const Wrapper = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  transition: 0.3s;
  padding: 16px 0;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #272f5aee;

  &:last-child {
    margin-right: 0;
  }

  border: 1px solid #dcdee4;

  &:hover {
    border-color: #189ee9;
    box-shadow: 0 4px 8px 0 #189ee955;
  }

  ${({ active }) =>
    active &&
    `border-color: #189ee9;
      box-shadow: 0 4px 8px 0 #189ee955;`}
`;

export const Text = styled.div`
  margin-left: 16px;
  font-size: 24px;
  color: #272f5ae5;
  font-weight: 500;
`;

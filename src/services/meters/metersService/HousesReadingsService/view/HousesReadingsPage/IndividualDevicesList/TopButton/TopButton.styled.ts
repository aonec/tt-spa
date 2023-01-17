import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  z-index: 5;
`;

export const Button = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  background: white;

  &:first-child {
    border-right: 1px solid lightgray;
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }

  &:hover {
    background: #0099ff;
    color: white;

    font-size: 22px;

    &:first-child {
      border-right: none;
    }
  }
`;

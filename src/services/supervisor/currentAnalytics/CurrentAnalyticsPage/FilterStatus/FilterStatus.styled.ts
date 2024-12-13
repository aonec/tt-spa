import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 8px;
  background: #f0f0f0;
  border-radius: 4px;
`;

export const Close = styled.div`
  height: 16px;
  width: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 4px #00000010;
  }
`;

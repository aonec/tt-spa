import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Bottom = styled.div`
  display: flex;
  gap: 8px;
  font-weight: 500;
  margin-top: 16px;
`;

export const Blue = styled.div`
  color: rgba(24, 158, 233, 1);

  cursor: pointer;
`;

export const Panel = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid rgba(39, 47, 90, 0.15);
  background: #fff;
  margin-top: 16px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    border: 1px solid rgba(24, 158, 233, 0.6);
    box-shadow: 0px 2px 10px 0px rgba(24, 158, 233, 0.4);
  }
`;

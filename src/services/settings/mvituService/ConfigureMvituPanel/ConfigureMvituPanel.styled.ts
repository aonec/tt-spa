import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 240px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #272f5a;
`;

export const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #272f5ab2;
`;

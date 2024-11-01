import styled from 'styled-components';

export const Wrapper = styled.div``;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 32px;

  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Panel = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid rgba(39, 47, 90, 0.04);
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  cursor: pointer;
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const Devider = styled.div`
margin-top: 16px;
  border-top: 1px solid rgba(39, 47, 90, 0.16);
`;

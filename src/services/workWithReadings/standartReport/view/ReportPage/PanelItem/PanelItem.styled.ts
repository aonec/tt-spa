import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(39, 47, 90, 0.04);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RightBlock = styled.div`
  width: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr 12px;
  align-items: center;
  justify-content: flex-end;
`;

export const Info = styled.div`
  font-weight: 300;
`;

export const Blue = styled.div`
  color: rgba(24, 158, 233, 1);
  font-weight: 500;

  cursor: pointer;
`;

export const PanelTitle = styled.div`
  font-weight: 500;
`;

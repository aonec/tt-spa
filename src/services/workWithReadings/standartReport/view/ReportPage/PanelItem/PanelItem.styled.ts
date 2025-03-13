import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  align-items: center;
  justify-content: space-between;
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
  width: 550px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 20px;
  align-items: center;
  justify-content: flex-end;
`;

export const Info = styled.div`
  font-weight: 300;
`;

export const PanelTitle = styled.div`
  font-weight: 500;
`;

export const PollStatusWrapper = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  width: max-content;
  white-space: nowrap;
  font-weight: bold;
  font-size: 13px;
`;

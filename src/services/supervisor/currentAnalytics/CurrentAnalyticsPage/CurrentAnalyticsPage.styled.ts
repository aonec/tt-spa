import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DashboardPanelWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

export const StatusPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
